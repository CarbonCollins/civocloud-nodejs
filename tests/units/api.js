'use strict';
const Mocha = require('mocha');
const Chai = require('chai');
const jsdocx = require('jsdoc-x');

const Test = Mocha.Test;
const Suite = Mocha.Suite;
const expect = Chai.expect;

const CivoCloud = require('../../index');

/**
 * @method getFunctionArgumentNames
 * @desc parses a function to determine its arguments and returns them as a string
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
 * @desc gets all of the js files within the lib directory and parses there jsdoc tags in order to
 * proceedurly generate tests based on the jsdocs. This requires certain tags to be present such
 * as the type (used to determine what type of request) aswell as the item under test needing to
 * be an inner method of a class.
 * @summary parse api jsdocs to generate test list
 * @returns {Promise} resolves with an object containing the jsdoc info or rejects with an error
 */
function getAPITests() {
  return jsdocx.parse('./lib/instance.js')
    .then((docs) => {
      const innerMethods = docs
        .filter((doc) => { // only get methods
          return doc.scope === 'inner' && doc.access && doc.access === 'public';
        })
        .map((doc) => { // map the docs to remove useless data
          return {
            params: (doc.params)
              ? doc.params.map((param) => {
                return { 
                  type: param.type.names[0],
                  name: param.name,
                  optional: (param.optional) ? true : false
                };
              })
              : [],
            memberof: doc.memberof,
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

const apiSuite = new Suite('civocloud-nodejs api test suite');

module.exports = () => { return getAPITests()
  .then((methods) => {
    const innerMethods = methods;
    const outerMethods = Object.keys(methods);

    for (let o = 0, oLength = outerMethods.length; o < oLength; o += 1) {
      const testSuite = new Suite(`${outerMethods[o]}`);
      for (let i = 0, iLength = innerMethods[outerMethods[o]].length; i < iLength; i += 1) {
        const method = innerMethods[outerMethods[o]][i];
        const methodSuite = new Suite(`${method.name}()`);
        methodSuite.addTest(new Test('Function exposed', () => {
          const civo = new CivoCloud('test');
          expect(civo[method.name]).to.be.a('function', 'method is not exposed as a function');
        }));

        methodSuite.addTest(new Test('Correct Parameters', () => {
          const civo = new CivoCloud('test');
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





// describe('civocloud-nodejs test suite', () => {
//   let innerMethods = {};
//   let outerMethods = [];
//   before((done) => {
//     getAPITests()
//       .then((methods) => {
//         console.log('complete');
//         innerMethods = methods;
//         outerMethods = Object.keys(methods);
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       })
//   });

//   describe('package tests', () => {
//     require('./units/package/package')(expect, CivoCloud);
//   });

//   describe('API tests', () => {
//     describe('Instance API tests', () => {
//       for (let i = 0, iLength = innerMethods.InstanceAPI.length; i < iLength; i += 1) {
//         it(`${innerMethods.InstanceAPI[i].name} tests`, (done) => {
//           done();
//         });
//       }
//     });
//   });

// });


/*
const slSuite = new Suite('some suite');

tlSuite.addSuite(slSuite);

tlSuite.addTest(new Test('test case', (done) => {
  done();
}));

slSuite.addTest(new Test('test case 2', (done) => {
  done();
}));

mocha.run();
*/