'use strict';
const Mocha = require('mocha');
const Chai = require('chai');
const jsdocx = require('jsdoc-x');
const http = require('http');
const qs = require('querystring');
const EventEmitter = require('events');


const Test = Mocha.Test;
const Suite = Mocha.Suite;
const expect = Chai.expect;

const serverEmitter = new EventEmitter();
const serverPort = 3334;
const serverHost = '127.0.0.1';
const serverValidKey = 'validKey';
const serverValidId = 'validId';
let server;

const civocloud = require('../../index');

/**
 * @method getFunctionArgumentNames
 * @description parses a function to determine its arguments and returns them as a string
 * @param {Function} func the function to parse
 * @returns {String[]} an array of argument names for the suppl;ied function
 */
function getFunctionArgumentNames(func) {
  const argMatches = func.toString().match(/\(([^)]*)\)/);
  const argString = (argMatches && Array.isArray(argMatches) && argMatches.length >= 2) ? argMatches[1] : '';
  return argString.split(',').map((arg) => { return arg.trim(); });
}

/**
 * @method getAPITests
 * @description gets all of the js files within the lib directory and parses there jsdoc tags in order to
 * proceedurly generate tests based on the jsdocs. This requires certain tags to be present such
 * as the type (used to determine what type of request) aswell as the item under test needing to
 * be an inner method of a class.
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
          console.log(doc.name);
          console.log(doc.see);
          return {
            params: (doc.params)
              ? doc.params
                .map((param) => {
                  return { 
                    type: param.type.names[0],
                    name: param.name,
                    optional: (param.optional) ? true : false
                  };
                })
                .filter((param) => {
                  return !param.name.includes('.');
                })
              : [],
            memberof: doc.memberof,
            description: doc.description,
            see: doc.see,
            name: doc.name };
        })
        .reduce((methods, doc) => { // sort all the functions into categories (mixins)
          if (!methods[doc.memberof]) {
            methods[doc.memberof] = [];
          }
          methods[doc.memberof].push(doc);
          return methods;
        }, {})
      return innerMethods;
    })
}

const apiSuite = new Suite('civocloud-nodejs api tests');

module.exports = () => { return getAPITests()
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
          res.end();
        });
      });

      server.on('listening', () => {
        done();
      });

      server.listen(serverPort, serverHost);
    });

    apiSuite.afterAll('Test Endpoint destroy', (done) => {
      server.close((err) => {
        done(err);
      })
    });

    const innerMethods = methods;
    const outerMethods = Object.keys(methods);

    for (let o = 0, oLength = outerMethods.length; o < oLength; o += 1) {
      const testSuite = new Suite(`${outerMethods[o]}`);
      for (let i = 0, iLength = innerMethods[outerMethods[o]].length; i < iLength; i += 1) {
        const method = innerMethods[outerMethods[o]][i];
        const methodSuite = new Suite(`${method.name}()`);
        
        methodSuite.addTest(new Test('Function exposed', () => {
          const civo = new civocloud.Civo('test');
          expect(civo[method.name]).to.be.a('function', 'method is not exposed as a function');
        }));

        methodSuite.addTest(new Test('Function has description', () => {
          expect(method.description).to.not.be.equal(undefined, 'Description should exist for function');
          expect(method.description).to.not.be.empty;
        }));

        methodSuite.addTest(new Test('Function has see link to civo.com/api', () => {
          expect(method.see).to.not.be.undefined;
          expect(method.see).to.be.an('array');
          expect(method.see).to.have.lengthOf(1);
          expect(method.see).to.include.to.match(/{@link https:\/\/www\.civo\.com\/api.+/);
        }));

        methodSuite.addTest(new Test('Correct Parameters', () => {
          const civo = new civocloud.Civo('test');
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
          expect(civo[method.name]).to.be.a.Function;
        }));

        testSuite.addSuite(methodSuite);
      }

      apiSuite.addSuite(testSuite);
    }

    return apiSuite;
  });
};
