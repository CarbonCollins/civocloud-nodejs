# civocloud-nodejs
This module is for accessing the [civo API which is documented here](https://www.civo.com/api "CIVO API")

This package is currently not on npm as i have been pre writing docs.

## installation
1. install [npm](https://nodejs.org) "npm homepage")
2. `npm install civocloud --save`

## table of contents

- [getting started](#getting-started)
- [api functions](#api-functions)
  - [instance sizes](#instance-sizes)
    - [listInstanceSizes()](#listinstancesizes)
  - [instance regions](#instance-regions)
    - [listRegions()](#listregions)
- [other info](#other-info)

## getting started

this package uses native ES6 promises for all api calls.

to use `civocloud-nodejs` you first need to supply the api token:
```
const CivoCloud = require('civocloud');

const civo = new CivoCloud(apiToken);
```

a simple example of calling one of the APIs is:
```
const CivoCloud = require('civocloud');

const civo = new CivoCloud(apiToken);

civo.listInstanceSizes().then((sizes) => {
  console.log(sizes);
}).catch((err) => {
  console.error(err);
});
```

## api functions


### Instance Sizes

#### listInstanceSizes()
lists all of the available instance sizes that the civo account can use
```
civo.listInstanceSizes().then((sizes) => {
  console.log(sizes);
}).catch((err) => {
  console.error(err);
});
```
[api docs](https://www.civo.com/api/sizes "Instance Sizing docs")

### Instance Regions

#### listRegions()
lists all of the available instance regions that the civo account can use
```
civo.listRegions().then((regions) => {
  console.log(regions);
}).catch((err) => {
  console.error(err);
});
```
[api docs](https://www.civo.com/api/regions "Instance Regions docs")

## Other info
This package is not an official package from [civo](https://www.civo.com) and has not been made by them as it is just an abstraction layer to the [civo API](https://www.civo.com/api "civo API").

