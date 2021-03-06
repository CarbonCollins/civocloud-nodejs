'use strict';

const Mocha = require('mocha');
const Chai = require('chai');
const jsdocx = require('jsdoc-x');
const http = require('http');
const qs = require('querystring');
const EventEmitter = require('events');

const { Test, Suite } = Mocha;
const { expect } = Chai;

const serverEmitter = new EventEmitter();
const serverPort = 3334;
const serverAddress = '127.0.0.1';
const serverHost = `http://${serverAddress}`;
const serverValidKey = 'validKey';
let server;

const civocloud = require('../../index');

function generateArgsFromParams(params) {
  const parameters = ((Array.isArray(params)) ? params : [])
    .slice(0)
    .map((param) => {
      return param.type;
    })
    .map((param) => {
      if (param.includes('Array.<')) {
        switch (param.substr(7, (param.length - 8))) {
          case 'String':
            return ['test1', 'test2', 'test3'];
          case 'Number':
            return [5, 7, 9];
          case 'Object':
            return [{ test: true }, { test: false }];
          default:
            return [];
        }
      } else {
        switch (param) {
          case 'options={}':
            return {};
          case 'String':
            return 'test1';
          case 'Number':
            return 5;
          case 'Object':
            return { test: true, tags: ['test1', 'test2'] };
          default:
            return null;
        }
      }
    });

  return parameters;
}

/**
 * @method getFunctionArgumentNames
 * @description parses a function to determine its arguments and returns them as a string
 * @param {Function} func the function to parse
 * @returns {String[]} an array of argument names for the suppl;ied function
 */
function getFunctionArgumentNames(func) {
  const argMatches = func.toString().match(/\(([^)]*)\)/);
  const argString = (argMatches && Array.isArray(argMatches) && argMatches.length >= 2)
    ? argMatches[1]
    : '';
  return argString.split(',').map((arg) => { return arg.trim().replace('={}', ''); });
}

/**
 * @method getAPITests
 * @description gets all of the js files within the lib directory and parses there jsdoc tags in
 * order to proceedurly generate tests based on the jsdocs. This requires certain tags to be
 * present such as the type (used to determine what type of request) aswell as the item under test
 * needing to be an inner method of a class.
 * @summary parse api jsdocs to generate test list
 * @returns {Promise} resolves with an object containing the jsdoc info or rejects with an error
 */
function getAPITests() {
  return jsdocx.parse('./lib/*.js')
    .then((docs) => {
      const innerMethods = docs
        .filter((doc) => { // only get methods
          return doc.scope === 'inner' && doc.access && doc.access === 'public';
        })
        .map((doc) => { // map the docs to remove useless data
          return {
            params: (doc.params)
              ? doc.params
                .map((param) => {
                  return {
                    type: param.type.names[0],
                    name: param.name.replace('={}', ''),
                    optional: (param.optional && param.optional === true)
                  };
                })
                .filter((param) => {
                  return !param.name.includes('.');
                })
              : [],
            memberof: doc.memberof,
            description: doc.description,
            see: doc.see,
            name: doc.name
          };
        })
        .reduce((methods, doc) => { // sort all the functions into categories (mixins)
          if (!methods[doc.memberof]) {
            methods[doc.memberof] = [];
          }
          methods[doc.memberof].push(doc);
          return methods;
        }, {});
      return innerMethods;
    });
}

const apiSuite = new Suite('civocloud-nodejs api tests');

module.exports = () => {
  return getAPITests()
    .then((methods) => {
      apiSuite.beforeAll('Test Endpoint setup', (done) => {
        server = http.createServer((req, res) => {
          let data = '';

          req.on('data', (chunk) => { data += chunk; });

          req.on('end', () => {
            serverEmitter.emit('receivedRequest', {
              req,
              body: qs.parse(data) || {},
              params: (req.url.includes('?'))
                ? qs.parse(req.url.split('?')[1]) || {}
                : {}
            });

            res.writeHead(200);
            res.write('{}');
            res.end();
          });
        });

        server.on('listening', () => {
          done();
        });

        server.listen(serverPort, serverAddress);
      });

      apiSuite.afterAll('Test Endpoint destroy', (done) => {
        server.close((err) => {
          done(err);
        });
      });

      const innerMethods = methods;
      const outerMethods = Object.keys(methods);

      for (let o = 0, oLength = outerMethods.length; o < oLength; o += 1) {
        const testSuite = new Suite(`${outerMethods[o]}`);
        for (let i = 0, iLength = innerMethods[outerMethods[o]].length; i < iLength; i += 1) {
          const method = innerMethods[outerMethods[o]][i];
          const methodSuite = new Suite(`${method.name}()`);
          methodSuite.timeout(5000);
          
          methodSuite.addTest(new Test('Function exposed', () => {
            const civo = new civocloud.Civo({ apiToken: 'test' });
            expect(civo[method.name]).to.be.a('function', 'method is not exposed as a function');
          }));

          methodSuite.addTest(new Test('Function has description', () => {
            expect(method.description).to.not.be.equal(undefined, 'Description should exist for function');
            expect(method.description).to.not.be.equal(null);
            expect(method.description).to.not.be.equal('');
          }));

          methodSuite.addTest(new Test('Function has see link to civo.com/api', () => {
            expect(method.see).to.not.be.equal(undefined);
            expect(method.see).to.be.an('array');
            expect(method.see).to.have.lengthOf(1);
            expect(method.see).to.include.to.match(/{@link https:\/\/www\.civo\.com\/api.+/);
          }));


          if (/\[GET|POST|PUT|HEAD|DELETE|OPTIONS\]/.test(method.description)) {
            // request stuff here
            methodSuite.addTest(new Test('Function calls API endpoint', (done) => {
              const methodType = method.description.match(/\[(GET|POST|PUT|HEAD|DELETE|OPTIONS)\]/)[1];
              const MUTT = new civocloud.Civo({ apiToken: serverValidKey, host: serverHost, port: serverPort });
              serverEmitter.once('receivedRequest', (payload) => {
                expect(payload.req.headers).to.deep.include({ authorization: 'Bearer validKey' });
                expect(payload.req.method).to.be.equal(methodType);
                done();
              });

              MUTT[method.name](...generateArgsFromParams(method.params))
                .catch((err) => {
                  done(err);
                });
            }));
          }

          methodSuite.addTest(new Test('Correct Parameters', () => {
            const civo = new civocloud.Civo({ apiToken: 'test' });
            const nonOptionalParams = method.params
              .filter((param) => {
                return ((!param.optional || (param.optional && param.optional === false)) && param.name !== '');
              })
              .map((param) => {
                return param.name;
              });
            const hasOptionals = method.params
              .map((param) => {
                return param.optional || false;
              })
              .reduce((hasOptional, arg) => {
                return (hasOptional || arg);
              }, false);

            if (hasOptionals === true) {
              nonOptionalParams.push('options');
            }

            if (nonOptionalParams.length === 0) {
              nonOptionalParams.push('');
            }
            expect(getFunctionArgumentNames(civo[method.name])).to.have.members(nonOptionalParams);
            expect(civo[method.name]).to.be.an('function');
          }));

          testSuite.addSuite(methodSuite);
        }

        apiSuite.addSuite(testSuite);
      }

      const handleResponseSuite = new Suite('handleResponse functional tests');

      handleResponseSuite.addTest(new Test('success 200 response', (done) => {
        const civo = new civocloud.Civo({ apiToken: 'test' });
        const responseFunction = civo.handleResponse((body) => {
          expect(body).to.not.be.equal(undefined);
          expect(body).to.be.an('object');
          expect(body).to.include.keys('test');
          expect(body.test).to.be.equal('test');
          done();
        }, () => {
          done(new Error('Function returned an error when it should have resolved'));
        });

        responseFunction(null, { statusCode: 200 }, '{"test":"test"}');
      }));

      handleResponseSuite.addTest(new Test('errored response', (done) => {
        const civo = new civocloud.Civo({ apiToken: 'test' });
        const responseFunction = civo.handleResponse(() => {
          done(new Error('Function resolved when it was expecting to have returned an error'));
        }, (err) => {
          expect(err).to.not.be.equal(undefined);
          expect(err).to.be.an('error');
          expect(err.message).to.be.equal('fake error');
          done();
        });

        responseFunction(new Error('fake error'));
      }));

      handleResponseSuite.addTest(new Test('non 200 response code', (done) => {
        const civo = new civocloud.Civo({ apiToken: 'test' });
        const responseFunction = civo.handleResponse(() => {
          done(new Error('Function resolved when it was expecting to have returned an error'));
        }, (err) => {
          expect(err).to.not.be.equal(undefined);
          expect(err).to.be.an('object');
          expect(err).to.include.keys('test');
          expect(err.test).to.be.equal('test');
          done();
        });

        responseFunction(null, { statusCode: 500 }, '{"test":"test"}');
      }));

      handleResponseSuite.addTest(new Test('non stringified json response', (done) => {
        const civo = new civocloud.Civo({ apiToken: 'test' });
        const responseFunction = civo.handleResponse(() => {
          done(new Error('Function resolved when it was expecting to have returned an error'));
        }, (err) => {
          expect(err).to.not.be.equal(undefined);
          expect(err).to.be.an('object');
          expect(err).to.include.keys(['body', 'error']);
          expect(err.body).to.not.be.equal(undefined);
          expect(err.body).to.be.an('string');
          expect(err.body).to.be.equal('some non json string');
          expect(err.error).to.not.be.equal(undefined);
          expect(err.error).to.be.an('error');
          done();
        });

        responseFunction(null, { statusCode: 200 }, 'some non json string');
      }));

      apiSuite.addSuite(handleResponseSuite);

      return apiSuite;
    });
};
