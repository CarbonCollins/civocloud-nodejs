# civocloud-nodejs
This module is for accessing the [civo API which is documented here](https://www.civo.com/api "CIVO API")

This package is currently not on npm as i have been pre writing docs.

## installation
1. install [npm](https://nodejs.org "npm homepage")
2. `$ npm install civocloud --save`

## table of contents

- [getting started](#getting-started)
- [api functions](#api-functions)
  - [ssh keys](#ssh-keys)
    - [listSSHKeys()](#listsshkeys)
    - [uploadSSHKey()](#uploadsshkeyname-publickey)
  - [networks](#networks)
    - [listNetworks()](#listnetworks)
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

### api keys

#### listSSHKeys()
lists all of the ssh keys which are stored on civo
```
civo.listSSHKeys().then((keys) => {
  console.log(keys);
}).catch((err) => {
  console.error(err);
});
```

#### uploadSSHKey(name, public_key)
uploads a `public_key` ssh string into civo with a given `name`
```
civo.uploadSSHKey('some key name', public_key).then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```
the public_key should be an ssh public key with the appended key type but no prepended data

[ssh keys api docs](https://www.civo.com/api/sshkeys "SSH keys docs")

### networks

#### listNetworks()
lists all of the available networks on the civo account
```
civo.listNetworks().then((networks) => {
  console.log(networks);
}).catch((err) => {
  console.error(err);
});
```

[networks api docs](https://www.civo.com/api/networks "Networks docs")

### instance sizes

#### listInstanceSizes()
lists all of the available instance sizes that the civo account can use
```
civo.listInstanceSizes().then((sizes) => {
  console.log(sizes);
}).catch((err) => {
  console.error(err);
});
```

[instance sizing api docs](https://www.civo.com/api/sizes "Instance Sizing docs")

### instance regions

#### listRegions()
lists all of the available instance regions that the civo account can use
```
civo.listRegions().then((regions) => {
  console.log(regions);
}).catch((err) => {
  console.error(err);
});
```

[instance regions api docs](https://www.civo.com/api/regions "Instance Regions docs")

## Other info
This package is not an official package from [civo](https://www.civo.com) and has not been made by them as it is just an abstraction layer to the [civo API](https://www.civo.com/api "civo API").

