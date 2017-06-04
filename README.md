# civocloud-nodejs

[![GitHub issues](https://img.shields.io/github/issues/CarbonCollins/civocloud-nodejs.svg?style=flat-square)](https://github.com/CarbonCollins/civocloud-nodejs/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/CarbonCollins/civocloud-nodejs/master/LICENSE)
[![GitHub (pre-)release](https://img.shields.io/github/release/CarbonCollins/civocloud-nodejs/all.svg?style=flat-square)]()
[![David](https://img.shields.io/david/CarbonCollins/civocloud-nodejs.svg?style=flat-square)]()
[![David](https://img.shields.io/david/dev/CarbonCollins/civocloud-nodejs.svg?style=flat-square)]()
[![Travis](https://img.shields.io/travis/CarbonCollins/civocloud-nodejs.svg?style=flat-square)]()

This module is for accessing the [v2 civo API which is documented here](https://www.civo.com/api "CIVO API")

## installation
1. install [npm](https://nodejs.org "npm homepage")
2. `npm install civocloud --save`

## table of contents

- [getting started](#getting-started)
- [api functions](#api-functions)
  - [ssh keys](#ssh-keys)
    - [listSSHKeys()](#listsshkeys)
    - [uploadSSHKey(name, public_key)](#uploadsshkeyname-publickey)
    - [deleteSSHKey(id)](#deletesshkeyid)
  - [instances](#instances) 
    - [listInstances()](#listinstances)
    - [createInstance(size, network_id, hostname[, template, initial_user, ssh_key_id, region, public_ip, snapshot_id, tags])](#createinstancesize-networkid-hostname-template-initialuser-sshkeyid-region-publicip-snapshotid-tags)
    - [deleteInstance(id)](#deleteinstanceid)
    - [getInstance(id)](#getinstanceid)
  - [networks](#networks)
    - [listNetworks()](#listnetworks)
    - [createNetwork(label[, region])](#createnetworklabel-region)
    - [renameNetwork(id, label)](#renamenetworkid-label)
    - [deleteNetwork(id)](#deletenetworkid)
  - [snapshots](#snapshots)
    - [listSnapshots()](#listsnapshots)
    - [createSnapshot(name, instance_id[, safe])](#createsnapshotname-instanceid-safe)
    - [updateSnapshot(name, instance_id[, safe])](#updatesnapshotname-instanceid-safe)
    - [deleteSnapshot(name)](#deletesnapshotname)
  - [firewalls](#firewalls)
    - [listFirewalls()](#listfirewalls)
    - [createFirewall(name)](#createfirewallname)
    - [deleteFirewall(id)](#deletefirewallid)
    - [listFirewallRules(id)](#listfirewallrulesid)
    - [createFirewallRule(id, protocol, start_port[, end_port, direction, cidr])](#createfirewallruleid-protocol-startport-endport-direction-cidr)
    - [deleteFirewallRule(id, rule_id)](#deletefirewallruleid-ruleid)
  - [instance sizes](#instance-sizes)
    - [listInstanceSizes()](#listinstancesizes)
  - [instance regions](#instance-regions)
    - [listRegions()](#listregions)
  - [instance templates](#instance-templates)
    - [listTemplates()](#listtemplates)
    - [createTemplate(image_id, name[, short_description, description, default_username, cloud_config])](#createtemplateimageid-name-shortdescription-description-defaultusername-cloudconfig)
    - [deleteTemplate()](#deletetemplate)
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

#### deleteSSHKey(id)
deletes an existing ssh key (`id`) within civo
```
civo.deleteSSHKey().then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```

[ssh keys api docs](https://www.civo.com/api/sshkeys "SSH keys docs")

### instances

#### listInstances()
lists all of the available instances on the civo account
```
civo.listInstances().then((instances) => {
  console.log(instances);
}).catch((err) => {
  console.error(err);
});
```

#### createInstance(size, network_id, hostname[, template, initial_user, ssh_key_id, region, public_ip, snapshot_id, tags])
creates a new instance on the civo account.
The example below creates an medium `size` ubuntu 14.04 instance (default if `template` not specified) within a specified `network_id` with a `hostname`. The package contains an object with XS, S, M, and L instance sizes however you can also use the size strings received from [listSizes()](#listsizes) which is shown in the second example.
```
civo.createInstance(civo.instanceSizes.M, 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'test-instance').then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```
This example creates a large (using the result from [listSizes()](#listsizes)) ubuntu 16.04 instance with an `initial_user` of "test" and an existing uploaded `ssh_key_id` (uploaded with [uploadSSHKey(name, public_key)](#uploadsshkeyname-publickey)) within the london `region` (using result from [listRegions()](#listregions)) and with a `public_ip` address, not from a snapshot and has some various tags
```
civo.createInstance('gl.large', 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'test-instance', 'ubuntu-16.04', 'test', 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'lon1', true, null, 'some test tags here').then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```

#### deleteInstance(id)

deletes an existing instance specified using the instances `id`
```
civo.deleteInstance('xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx').then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```

#### getInstance(id)

gets an existing instance specified using the instances `id`
```
civo.getInstance('xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx').then((instance) => {
  console.log(instance);
}).catch((err) => {
  console.error(err);
});
```

[instance api docs](https://www.civo.com/api/instances "Instance docs")

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

### snapshots

#### listSnapshots()
snapshots that the civo account can use
```
civo.listSnapshots().then((snapshots) => {
  console.log(snapshots);
}).catch((err) => {
  console.error(err);
});
```

#### createSnapshot(name, instance_id, safe)
createSnapshot is just an alias of [updateSnapshot()](#updatesnapshotname-instanceid-safe) for code readability.

#### updateSnapshot(name, instance_id, safe)
this function updates an existing snapshot (`name`) or creates a new snapshot within the civo account of a specified instance (`instance_id`)
```
civo.listSnapshots('test-snapshot', 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx').then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```
an optional `safe` boolean can be set to specify if the instance is first shutdown before snapshotting (true) or to snapshot while it is running (false)
```
civo.listSnapshots('test-snapshot', 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', true).then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```

#### deleteSnapshot(name)
deletes a snapshot in civo with a `name`
```
civo.deleteSnapshot('test').then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```

[snapshots api docs](https://www.civo.com/api/networks "Snapshot docs")

### firewalls

#### listFirewalls()
lists all of the available firewalls that the civo account can use
```
civo.listFirewalls().then((firewalls) => {
  console.log(firewalls);
}).catch((err) => {
  console.error(err);
});
```

#### createFirewall(name)

creates a new firewall in civo with a given `name`
```
civo.createFirewall('test firewall').then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```

#### deleteFirewall(id)
deletes a firewall in civo with a firewall 'id'
```
civo.deleteFirewall('xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx').then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```

#### listFirewallRules(id)
lists all of the available firewall rules that a specific firewall has in the civo account
```
civo.listFirewallRules('xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx').then((rules) => {
  console.log(rules);
}).catch((err) => {
  console.error(err);
});
```

#### createFirewallRule(id, protocol, start_port[, end_port, direction, cidr])
creates a new firewall rule within the specified firewall `id` with a `protocol` and port number (`start_port`)
```
civo.createFirewallRule('xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'tcp', '80').then((rule) => {
  console.log(rule);
}).catch((err) => {
  console.error(err);
});
```
optionaly a port range can be specified with `start_port` and `end_port` aswell as a `direction` and a `cidr`
```
civo.createFirewallRule('xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'tcp', '3000', '3010', 'inwards', '0.0.0.0/0').then((rule) => {
  console.log(rule);
}).catch((err) => {
  console.error(err);
});
```

#### deleteFirewallRule(id, rule_id)
deletes a firewall rule (`rule_id`) from a specified firewall (`id`)
```
civo.deleteFirewallRule('xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx', 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx').then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```

[firewalls api docs](https://www.civo.com/api/firewalls "Firewalls docs")

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

### instance templates

#### listTemplates()
lists all of the available templates that can be used when creating an instance
```
civo.listTemplates().then((templates) => {
  console.log(templates);
}).catch((err) => {
  console.error(err);
});
```

#### createTemplate(name, image_id[, short_description, description, default_username, cloud_config])
creates a new custom template in civo with a `name` and openstack `image_id`
```
civo.createTemplate('test template', 'ubuntu-16.04').then((template) => {
  console.log(template);
}).catch((err) => {
  console.error(err);
});
```

#### deleteTemplate(id)
deletes a custom template in civo with a template 'id'
```
civo.deleteTemplate('xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx').then((payload) => {
  console.log(payload);
}).catch((err) => {
  console.error(err);
});
```

[instance templates api docs](https://www.civo.com/api/templates "Templates docs")

### quota

#### getQuota()
gets the quotas for the civo account.
```
civo.getQuota().then((quotas) => {
  console.log(quotass);
}).catch((err) => {
  console.error(err);
});
```

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

