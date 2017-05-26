# civocloud-nodejs

[![GitHub issues](https://img.shields.io/github/issues/CarbonCollins/civocloud-nodejs.svg?style=flat-square)](https://github.com/CarbonCollins/civocloud-nodejs/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/CarbonCollins/civocloud-nodejs/master/LICENSE)
[![GitHub (pre-)release](https://img.shields.io/github/release/CarbonCollins/civocloud-nodejs/all.svg?style=flat-square)]()
[![David](https://img.shields.io/david/CarbonCollins/civocloud-nodejs.svg?style=flat-square)]()
[![David](https://img.shields.io/david/dev/CarbonCollins/civocloud-nodejs.svg?style=flat-square)]()
[![Travis](https://img.shields.io/travis/CarbonCollins/civocloud-nodejs.svg?style=flat-square)]()

This module is for accessing the [civo API which is documented here](https://www.civo.com/api "CIVO API")

## installation
1. install [npm](https://nodejs.org "npm homepage")
2. `npm install civocloud --save`

## table of contents

- [getting started](#getting-started)
- [api functions](#api-functions)
  - [ssh keys](#ssh-keys)
    - [listSSHKeys()](#listsshkeys)
    - [uploadSSHKey(name, public_key)](#uploadsshkeyname-publickey)
  - [networks](#networks)
    - [listNetworks()](#listnetworks)
    - [createNetwork(label[, region])](#createnetworklabel-region)
    - [renameNetwork(id, label)](#renamenetworkid-label)
    - [deleteNetwork(id)](#deletenetworkid)
  - [instance sizes](#instance-sizes)
    - [listInstanceSizes()](#listinstancesizes)
  - [instance regions](#instance-regions)
    - [listRegions()](#listregions)
  - [quota](#quota)
    - [getQuota()](#getQuota)
  - [charges](#charges)
    - [listCharges([from, to])](#listchargesfrom-to)
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

#### createNetwork(label[, region])

creates a new private network in civo with a given `label`
```
civo.createNetwork('test network').then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```
an optional `region` can also be specified:
```
civo.createNetwork('test network', 'lon1').then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```

#### renameNetwork(id, label)

renames an existsing private network identified by its `id` with `label`
```
civo.renameNetwork('xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'new test network').then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```

#### deleteNetwork(id)

deletes an existing private network specified using the networks `id`
```
civo.deleteNetwork('xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx').then((payload) => {
  console.log(payload);
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

### quota

#### getQuota()
gets the quotas for the civo account.
```
civo.getQuota().then((quotas) => {
  console.log(quotass);
}).catch((err) => {
  console.error(err);
});

[quota api docs](https://www.civo.com/api/quota "Quota docs")

### charges

#### listCharges([from, to])
lists all of the charges for an account with an optional date range (max 31 days) between `from` and `to`.
```
civo.listCharges().then((charges) => {
  console.log(charges);
}).catch((err) => {
  console.error(err);
});
```
The optional `to` and `from` need to be supplied in RFC3339 time string format (e.g. '2017-05-21T13:46:40Z') or you can pass a Date object into the function like so:
```
const dateNow = new Date();
const dateTenDaysAgo = new Date(dateNow.getDate() - 10);

civo.listCharges(dateTenDaysAgo, dateNow).then((charges) => {
  console.log(charges);
}).catch((err) => {
  console.error(err);
});
```

[charges api docs](https://www.civo.com/api/charges "Charges docs")

## Other info
This package is not an official package from [civo](https://www.civo.com) and has not been made by them as it is just an abstraction layer to the [civo API](https://www.civo.com/api "civo API").

