# civocloud-nodejs

[![GitHub issues](https://img.shields.io/github/issues/CarbonCollins/civocloud-nodejs.svg?style=flat)](https://github.com/CarbonCollins/civocloud-nodejs/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/CarbonCollins/civocloud-nodejs/master/LICENSE)
[![GitHub (pre-)release](https://img.shields.io/github/release/CarbonCollins/civocloud-nodejs/all.svg?style=flat)]()
[![David](https://img.shields.io/david/CarbonCollins/civocloud-nodejs.svg?style=flat)]()
[![David](https://img.shields.io/david/dev/CarbonCollins/civocloud-nodejs.svg?style=flat)]()
[![Travis](https://img.shields.io/travis/CarbonCollins/civocloud-nodejs.svg?style=flat)]()
[![Maintainability](https://api.codeclimate.com/v1/badges/37a079ce18bb52b3ee1e/maintainability)](https://codeclimate.com/github/CarbonCollins/civocloud-nodejs/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/37a079ce18bb52b3ee1e/test_coverage)](https://codeclimate.com/github/CarbonCollins/civocloud-nodejs/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/CarbonCollins/civocloud-nodejs/0f2eacb5d1cf39a3b3566b600ff18a5b0557434a/badge.svg)](https://snyk.io/test/github/CarbonCollins/civocloud-nodejs/0f2eacb5d1cf39a3b3566b600ff18a5b0557434a)

This module is for accessing the [v2 civo API which is documented here](https://www.civo.com/api "CIVO API")

v2 of this module has made some changes to the layout of some functions so if you are upgrading you may have to make some changes

## installation
1. install [npm](https://nodejs.org "npm homepage")
2. `npm install civocloud --save`

## table of contents

- [getting started](#getting-started)
- [api functions](#api-functions)
- [other info](#other-info)

## getting started

the package exports both an es6 module and an es5 common module which can both be used by your application. In most instances Node.JS will pick the right one for your application. this package also uses native ES6 promises for all api calls.

to use `civocloud-nodejs` you first need to supply the api token:
```
import { Civo } from 'civocloud';

const civo = new Civo({ apiToken: 'apiToken' });
```

a simple example of calling one of the APIs is:
```
import { Civo } = from 'civocloud';

const civo = new Civo({ apiToken: 'apiToken' });

civo.listInstanceSizes().then((sizes) => {
  console.log(sizes);
}).catch((err) => {
  console.error(err);
});
```

if you want to use common modules just replace the import statement with:

```
const { Civo } = require('civocloud');
```

## api functions

The api functions are now documented [on the API page](./docs/api.md)

## development info

this package uses several tools in the development and build processes which might be of intrest to anyone who wishes to develop on this package.

### linting

[ESLint](https://eslint.org/) is used for linting in this application and uses [.eslintrc.json](./.eslintrc.json) to configure this.

if you want to run the linter on its own run the following:
```
yarn run lint
```

### task runner

this package uses [gulp](https://gulpjs.com/) as its task runner to perform build tasks and generate documentation.

an example task is to regenerate the documentation you can run:
```
gulp generateDocs
```
or
```
yarn run generateDocs
```

### transpiling

this project uses [Babel](https://babeljs.io/) which transpiles the [ES6 source](src) into an [ES5 library](lib/es5) for use on older versions of Node.JS.
This can be run

to build source you can run:
```
gulp generate-lib
```
or
```
yarn run generateLib
```

and 

### tests & coverage

tests are run using the [Mocha](https://mochajs.org/) framework with the [Chai](http://www.chaijs.com/) assertion library. 
coverage is also performed using [Istanbul](https://istanbul.js.org/) library and outputs a html report normaly found in the covergae directory. [Travis-CI](https://travis-ci.org/) is also used to run tests automaticaly when commiting to the GitHub repository.


if you want to run the test suite then run the following (a coverage report is done at the same time):
```
yarn run test
```

### code analysis & metrics

this project also integrated with [CodeClimate](https://codeclimate.com/) to perform code analysis and to provide metrics on code quality and maintainability. This is done automaticaly when commiting to the GitHub repository and pulls in the test results from [Travis-CI](https://travis-ci.org/) to provide coverage analysis.

## Other info

This package is not an official package from [civo](https://www.civo.com) and has not been made by them as it is just an abstraction layer to the [civo API](https://www.civo.com/api "civo API").

