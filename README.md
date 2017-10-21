# civocloud-nodejs

[![GitHub issues](https://img.shields.io/github/issues/CarbonCollins/civocloud-nodejs.svg?style=flat-square)](https://github.com/CarbonCollins/civocloud-nodejs/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/CarbonCollins/civocloud-nodejs/master/LICENSE)
[![GitHub (pre-)release](https://img.shields.io/github/release/CarbonCollins/civocloud-nodejs/all.svg?style=flat-square)]()
[![David](https://img.shields.io/david/CarbonCollins/civocloud-nodejs.svg?style=flat-square)]()
[![David](https://img.shields.io/david/dev/CarbonCollins/civocloud-nodejs.svg?style=flat-square)]()
[![Travis](https://img.shields.io/travis/CarbonCollins/civocloud-nodejs.svg?style=flat-square)]()

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

this package uses native ES6 promises for all api calls.

to use `civocloud-nodejs` you first need to supply the api token:
```
const { Civo } = require('civocloud');

const civo = new Civo(apiToken);
```

a simple example of calling one of the APIs is:
```
const { Civo } = require('civocloud');

const civo = new Civo(apiToken);

civo.listInstanceSizes().then((sizes) => {
  console.log(sizes);
}).catch((err) => {
  console.error(err);
});
```

## api functions

The api functions are now documented [on the API page](./docs/api.md)

## Other info
This package is not an official package from [civo](https://www.civo.com) and has not been made by them as it is just an abstraction layer to the [civo API](https://www.civo.com/api "civo API").

