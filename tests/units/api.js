const { Test, Suite } = require('mocha');
const { expect } = require('chai');
const jsdocx = require('jsdoc-x');

const CivoCloud = require('../../index');

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
  return jsdocx.parse('./lib/*.js')
    .then((docs) => {
      const innerMethods = docs
        .filter((doc) => { // only get methods
          return doc.scope === 'inner' && doc.type;
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
            name: doc.name,
            type: doc.type.names[0] };
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

    let testSuite;
    let method;
    let methodSuite;

    for (let o = 0, oLength = outerMethods.length; o < oLength; o += 1) {
      console.log(oLength);
      testSuite = new Suite(`${outerMethods[o]} tests`);
      for (let i = 0, iLength = innerMethods[outerMethods[o]].length; i < iLength; i += 1) {
        console.log(iLength);
        method = innerMethods[outerMethods[o]][i];
        methodSuite = new Suite(`${method.name} tests`);
        if (method.type === 'GET' && method.params.length === 0) {
          methodSuite.addTest(new Test('Valid auth', (done) => {
            done(new Error('not written'));
          }));
        }
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