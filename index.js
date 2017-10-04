/**
 * Name:    civocloud-nodejs
 * Author:  Steven Collins (https://github.com/CarbonCollins)
 * Date:    Wednesday 17th May 2017
 *
 * Git:     https://github.com/CarbonCollins/civocloud-nodejs
 * Desc:    A module for accessing civo cloud apis
 */

'use strict';

const request = require('request');

/**
 * @class {CivoAPI} 
 */
class CivoAPI {
  /**
   * @constructor {CivoAPI}
   * @param {String} apiToken the provided api token from your civo account
   * @param {String} [endpoint] An optional end point
   */
  constructor(apiToken, endpoint) {
    this.apiToken = apiToken || '';
    this.endpoint = endpoint || 'https://api.civo.com/v2';
    if (this.apiToken === '') {
      throw new Error('invalid civo API key');
    }
  }

  /**
   * @method handlerResponse handles the responses from the civo API
   * @param {Function} resolve a promise resolve callback
   * @param {Function} reject a promise reject callback
   */
  __handleResponse(resolve, reject) {
    return (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        try {
          if (res.statusCode >= 200 || res.statusCode <= 202) {
            resolve(JSON.parse(body));
          } else {
            reject(JSON.parse(body));
          }
        } catch (error) {
          reject({ error, body });
        }
      }
    };
  }

  /**
   * @method __getRequest performs a get request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @param {String|Object} [qs] an optional query string to attach to the request
   * @returns {Promise} resolves with the body or rejects with an error
   */
  __getRequest(path, qs) {
    return new Promise((resolve, reject) => {
      request
      .get(`${this.endpoint}/${path}`, { qs }, this.__handleResponse(resolve, reject))
      .auth(null, null, true, this.apiToken);
    });
  }

  /**
   * @method __postRequest performs a post request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @param {Object} form form data to be attached to the request
   * @returns {Promise} resolves with the body or rejects with an error
   */
  __postRequest(path, form) {
    return new Promise((resolve, reject) => {
      if (form) {
        request
        .post(`${this.endpoint}/${path}`, {}, this.__handleResponse(resolve, reject))
        .form(form)
        .auth(null, null, true, this.apiToken);
      } else {
        request
        .post(`${this.endpoint}/${path}`, {}, this.__handleResponse(resolve, reject))
        .auth(null, null, true, this.apiToken);
      }
    });
  }

  /**
   * @method __putRequest performs a put request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @param {Object} form form data to be attached to the request
   * @returns {Promise} resolves with the body or rejects with an error
   */
  __putRequest(path, form) {
    return new Promise((resolve, reject) => {
      if (form) {
        request
        .put(`${this.endpoint}/${path}`, {}, this.__handleResponse(resolve, reject))
        .form(form)
        .auth(null, null, true, this.apiToken);
    } else {
        request
        .put(`${this.endpoint}/${path}`, {}, this.__handleResponse(resolve, reject))
        .auth(null, null, true, this.apiToken);
    }
    });
  }

  /**
   * @method __deleteRequest performs a put request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @returns {Promise} resolves with the body or rejects with an error
   */
  __deleteRequest(path) {
    return new Promise((resolve, reject) => {
      request
      .delete(`${this.endpoint}/${path}`, {}, this.__handleResponse(resolve, reject))
      .auth(null, null, true, this.apiToken);
    });
  }

  // ----- SSH Keys APIs ----- //

  /**
   * @method CivoAPI~listSSHKeys gets an array of the currently available ssh keys on civo cloud
   * @returns {Promise} a promise wich resolves with the sshkeys list or rejects with an error
   */
  listSSHKeys() {
    return this.__getRequest('sshkeys');
  }

  /**
   * @method CivoAPI~uploadSSHKey uploads a supplied ssh key into civo
   * @param {String} name the name to be used to identify the key in civo
   * @param {String} public_key the public key string to be uploaded
   * @returns {Promise} a promise wich resolves with the result and id or rejects with an error
   */
  uploadSSHKey(name, public_key) {
    return this.__postRequest('sshkeys', { name, public_key });
  }

  /**
   * @method CivoAPI~listSSHKeys gets an array of the currently available ssh keys on civo cloud
   * @param {String} name the name of the public key to delete
   * @returns {Promise} a promise wich resolves with the sshkeys list or rejects with an error
   */
  deleteSSHKey(name) {
    return this.__deleteRequest(`sshkeys/${name}`);
  }

  // ----- Instance APIs ----- //

  /**
   * @method CivoAPI~listInstances gets an array of the instances on civo cloud
   * @returns {Promise} a promise wich resolves with the instance list or rejects with an error
   */
  listInstances() {
    return this.__getRequest('instances');
  }

  /**
   * @method CivoAPI~createInstance creates a new instance network in civo
   * @param {String} size the size of the instance to create (obtained from listInstanceSizes())
   * @param {String} network_id the id of the private network to create the instance in
   * @param {String} hostname the name of the instance to use
   * @param {String} [template] the id of the template to use
   * @param {String} [initial_user] the name of the initial user to create on the instance
   * @param {String} [ssh_key_id] the id of the ssh key to add to the instance
   * @param {String} [region] the region to create the instance in
   * @param {Boolean} [public_ip] specifies if a public ip should be given to the new instance
   * @param {String} [snapshot_id] the id of the snapshot to load into the instance
   * @param {String} [tags] a space seperated list of tags to add to the instance
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  createInstance(size, network_id, hostname, template, initial_user, ssh_key_id, region, public_ip, snapshot_id, tags) {
    return this.__postRequest('instances', { size, network_id, hostname, template, initial_user, ssh_key_id, region, public_ip, snapshot_id, tags });
  }

  /**
   * @method CivoAPI~deleteInstance deletes an existing instance within civo
   * @param {String} id the instance id to be used to identify the instance in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  deleteInstance(id) {
    return this.__deleteRequest(`instances/${id}`);
  }

  /**
   * @method CivoAPI~getInstance gets an existing instance from civo
   * @param {String} id the instance id to be used to identify the instance in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  getInstance(id) {
    return this.__getRequest(`instances/${id}`);
  }

  /**
   * @method CivoAPI~retagInstance updates the tags on an existing instance in civo
   * @param {String} id the instance id to be used to identify the instance in civo
   * @param {String|String[]} [tags] a space seperated string of tags or an array of tags
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  retagInstance(id, tags) {
    if (tags && Array.isArray(tags)) {
      tags = `${tags.join(' ')}`;
    }
    return this.__putRequest(`instances/${id}/tags`, { tags });
  }

  /**
   * @method CivoAPI~rebootInstance reboots an instance in civo
   * @param {String} id the instance id to be used to identify the instance in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  rebootInstance(id) {
    return this.__postRequest(`instances/${id}/reboot`);
  }

  /**
   * @method CivoAPI~hardRebootInstance hard reboots an instance in civo
   * @param {String} id the instance id to be used to identify the instance in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  hardRebootInstance(id) {
    return this.__postRequest(`instances/${id}/hard_reboot`);
  }

  /**
   * @method CivoAPI~softRebootInstance soft reboots an instance in civo
   * @param {String} id the instance id to be used to identify the instance in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  softRebootInstance(id) {
    return this.__postRequest(`instances/${id}/soft_reboot`);
  }

  /**
   * @method CivoAPI~stopInstance stops (shutdown) an instance in civo
   * @param {String} id the instance id to be used to identify the instance in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  stopInstance(id) {
    return this.__putRequest(`instances/${id}/stop`);
  }

  /**
   * @method CivoAPI~startInstance starts an instance in civo
   * @param {String} id the instance id to be used to identify the instance in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  startInstance(id) {
    return this.__putRequest(`instances/${id}/start`);
  }

  /**
   * @method CivoAPI~resizeInstance resizes an instance in civo
   * @param {String} id the instance id to be used to identify the instance in civo
   * @param {String} size the new size to resize the exsting instance to
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  resizeInstance(id, size) {
    return this.__putRequest(`instances/${id}/resize`, { size });
  }

  /**
   * @method CivoAPI~rebuildInstance rebuilds an instance in civo
   * @param {String} id the instance id to be used to identify the instance in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  rebuildInstance(id) {
    return this.__putRequest(`instances/${id}/rebuild`);
  }

  /**
   * @method CivoAPI~restoreInstance restores an instance in civo from a snapshot
   * @param {String} id the instance id to be used to identify the instance in civo
   * @param {String} snapshot the snapshot id to specify which snapshot to restore
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  restoreInstance(id, snapshot) {
    return this.__putRequest(`instances/${id}/restore`, { snapshot });
  }

  /**
   * @method CivoAPI~restoreInstance Applies a firewall to an instance
   * @param {String} id the instance id to be used to identify the instance in civo
   * @param {String} [firewall_id] the firewall id to specify which firewall to apply
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  updateInstanceFirewall(id, firewall_id) {
    return this.__putRequest(`instances/${id}/firewall`, { firewall_id });
  }

  /**
   * @method CivoAPI~movePublicIpToInstance Moves an owned public ip address from another instance you own to the specified instance
   * @param {String} id the instance id to be used to identify the instance in civo
   * @param {String} ip_address the ip address to move to this instance
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  movePublicIpToInstance(id, ip_address) {
    return this.__putRequest(`instances/${id}/ip/${ip_address}`);
  }

  // ----- Network APIs ----- //

  /**
   * @method CivoAPI~listNetworks gets an array of the private networks on civo cloud
   * @returns {Promise} a promise wich resolves with the network list or rejects with an error
   */
  listNetworks() {
    return this.__getRequest('networks');
  }

  /**
   * @method CivoAPI~createNetwork creates a new private network in civo
   * @param {String} label the name to be used to identify the key in civo
   * @param {String} [region] an optional region to create the network in
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  createNetwork(label, region) {
    return this.__postRequest('networks', { label, region });
  }

  /**
   * @method CivoAPI~renameNetwork renames an existing network within civo
   * @param {String} id the networks id to be used to identify the network in civo
   * @param {String} label the new label to be used for the network
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  renameNetwork(id, label) {
    return this.__putRequest(`networks/${id}`, { label });
  }

  /**
   * @method CivoAPI~deleteNetwork deletes an existing network within civo
   * @param {String} id the networks id to be used to identify the network in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  deleteNetwork(id) {
    return this.__deleteRequest(`networks/${id}`);
  }

  // ----- Snapshot APIs ----- //

  /**
   * @method CivoAPI~listSnapshots gets an array of the snapshots on civo account
   * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
   */
  listSnapshots() {
    return this.__getRequest('snapshots');
  }

  /**
   * @method CivoAPI~createSnapshot creates a snapshot of a given instance (alias of updateSnapshot)
   * @param {String} name the new name of the snapshot
   * @param {String} instance_id the id of the instance to be snapshotted
   * @param {Boolean} safe determins if an instance is stopped before snapshotting
   * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
   */
   createSnapshot(name, instance_id, safe) {
    return this.updateSnapshot(name, instance_id, safe);
  }

  /**
   * @method CivoAPI~updateSnapshot updates a snapshot of a given instance
   * @param {String} name the new name of the snapshot
   * @param {String} instance_id the id of the instance to be snapshotted
   * @param {Boolean} safe determins if an instance is stopped before snapshotting
   * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
   */
   updateSnapshot(name, instance_id, safe) {
    return this.__putRequest(`snapshots/${name}`, { instance_id, safe });
  }

  /**
   * @method CivoAPI~deleteSnapshot deletes an existing snapshot within civo
   * @param {String} name the snapshots name to be used to identify the network in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  deleteSnapshot(name) {
    return this.__deleteRequest(`snapshots/${name}`);
  }

  // ----- DNS APIs ----- //

  /**
   * @method CivoAPI~listDomains gets an array of the domains on civo account
   * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
   */
  listDomains() {
    return this.__getRequest('dns');
  }

  /**
   * @method CivoAPI~createDomain creates a new domain within civo
   * @param {String} name the ndomain name for the new domain
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  createDomain(name) {
    return this.__postRequest('dns', { name });
  }

  /**
   * @method CivoAPI~deleteDomain removes a new domain within civo
   * @param {String} id the domain id to be deleted
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  deleteDomain(id) {
    return this.__deleteRequest(`dns/${id}`);
  }

  /**
   * @method CivoAPI~listDomainRecords gets an array of the domains on civo account
   * @param {String} id the domains id to get the records in
   * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
   */
  listDomainRecords(id) {
    return this.__getRequest(`dns/${id}/records`);
  }

  /**
   * @method CivoAPI~createDomainRecord gets an array of the domains on civo account
   * @param {String} domain_id the domain to delete the record from
   * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
   */
  createDomainRecord(domain_id, type, name, value, priority, ttl) {
    return this.__postRequest(`dns/${domain_id}/records`, { type, name, value, priority, ttl });
  }

  /**
   * @method CivoAPI~deleteDomainRecord removes a new domain within civo
   * @param {String} domain_id the domain to delete the record from
   * @param {String} id the record to be deleted
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  deleteDomainRecord(domain_id, id) {
    return this.__deleteRequest(`dns/${domain_id}/records/${id}`);
  }

  // ----- Load Balancer APIs ----- //

  /**
   * @method CivoAPI~listLoadBalancers
   * @returns {Promise} resolves with a list of available load balancers or rejects with an error
   */
  listLoadBalancers() {
    return this.__getRequest('loadbalancers');
  }

  /**
   * @method CivoAPI~createLoadBalancer
   * @param {String} hostname the hostname to receive traffic on
   * @param {Object[]} backends an array of backends to load ballance
   * @param {String} backends.instance_id the backend instance_id
   * @param {String} backends.protocol the protocol to communicate with the backend on (either 'http' or 'https')
   * @param {Number} backends.port the port to communicate with the backend on
   * @param {String} [protocol='http'] protocol to use (either 'http' or 'https')
   * @param {String} [tls_certificate] if protocol is https then base64-encoded certificate in PEM format 
   * @param {String} [tls_key] if protocol is https then base64-encoded key in PEM format
   * @param {String|Number} [port=80] the port to listen on
   * @param {Number} [max_request_size=20] the maximum request size in megabytes
   * @param {String} [policy='random'] routing policy can be either 'least_conn', 'random', 'round_robin', or 'ip_hash'
   * @param {String} [health_check_path='/'] what url to use on the backends to check status
   * @param {Number} [fail_timeout=30] how long to wait (in seconds) before determining backend failure
   * @param {Number} [max_conns=10] how many concurrent connections a backend can handle
   * @param {Boolean} [ignore_invalid_backend_tls=true] ignore invalid/self-signed tls certs on backend 
   * @returns {Promise} resolves when load balancer is created or rejects with an error
   */
  createLoadBalancer(hostname, backends, protocol, tls_certificate, tls_key, port, max_request_size, policy, health_check_path, fail_timeout, max_conns, ignore_invalid_backend_tls) {
    return this.__postRequest('loadbalancers', { hostname, backends, protocol, tls_certificate, tls_key, port, max_request_size, policy, health_check_path, fail_timeout, max_conns, ignore_invalid_backend_tls });
  }

  /**
   * @method CivoAPI~updateLoadBalancer
   * @param {String} id the load balancers id to update
   * @param {String} [hostname] the hostname to receive traffic on
   * @param {Object[]} [backends] an array of backends to load ballance
   * @param {String} [backends.instance_id] the backend instance_id
   * @param {String} [backends.protocol] the protocol to communicate with the backend on (either 'http' or 'https')
   * @param {Number} [backends.port] the port to communicate with the backend on
   * @param {String} [protocol] protocol to use (either 'http' or 'https')
   * @param {String} [tls_certificate] if protocol is https then base64-encoded certificate in PEM format 
   * @param {String} [tls_key] if protocol is https then base64-encoded key in PEM format
   * @param {String|Number} [port] the port to listen on
   * @param {Number} [max_request_size] the maximum request size in megabytes
   * @param {String} [policy] routing policy can be either 'least_conn', 'random', 'round_robin', or 'ip_hash'
   * @param {String} [health_check_path] what url to use on the backends to check status
   * @param {Number} [fail_timeout] how long to wait (in seconds) before determining backend failure
   * @param {Number} [max_conns] how many concurrent connections a backend can handle
   * @param {Boolean} [ignore_invalid_backend_tls] ignore invalid/self-signed tls certs on backend 
   * @returns {Promise} resolves when load balancer is created or rejects with an error
   */
  updateLoadBalancer(id, hostname, backends, protocol, tls_certificate, tls_key, port, max_request_size, policy, health_check_path, fail_timeout, max_conns, ignore_invalid_backend_tls) {
    return this.__putRequest(`loadbalancers/${id}`, { hostname, backends, protocol, tls_certificate, tls_key, port, max_request_size, policy, health_check_path, fail_timeout, max_conns, ignore_invalid_backend_tls });
  }

  /**
   * @method CivoAPI~deleteLoadBalancer
   * @param {String} id the id for the load balancers to delete
   * @returns {Promise} resolves when load balancer is deleted or rejects with an error
   */
  deleteLoadBalancer(id) {
    return this.__deleteRequest(`loadbalancers/${id}`);
  }

  // ----- Firewall APIs ----- //

  /**
   * @method CivoAPI~listFirewalls gets an array of the firewalls on civo account
   * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
   */
  listFirewalls() {
    return this.__getRequest('firewalls');
  }

  /**
   * @method CivoAPI~createFirewall creates a new firewall in civo
   * @param {String} name the name to be used to identify the firewall in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  createFirewall(name) {
    return this.__postRequest('firewalls', { name });
  }

  /**
   * @method CivoAPI~deleteFirewall deletes an existing firewall within civo
   * @param {String} id the firewalls id to be used to identify the network in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  deleteFirewall(id) {
    return this.__deleteRequest(`firewalls/${id}`);
  }

  /**
   * @method CivoAPI~listFirewallRules gets an array of the firewalls rules on civo account
   * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
   */
  listFirewallRules(id) {
    return this.__getRequest(`firewalls/${id}/rules`);
  }

  /**
   * @method CivoAPI~createFirewallRule creates a new firewall rule within an existing firewall
   * @param {String} id the Id for the firewall to create the rule in
   * @param {String} [protocol] the protocol that the ule will allow e.g. 'tcp'
   * @param {String|Number} start_port The single port or start of a range of ports to allows
   * @param {Stirng|Number} [end_port] the end of a range of ports
   * @param {String} [direction] the direction in which the rule applies to e.g. 'inwards'
   * @param {String} [cidr] a ip range in which the rule is applied to e.g. '0.0.0.0/0' for all
   * @returns {Promise} a promise wich resolves with a success or rejects with an error
   */
  createFirewallRule(id, protocol, start_port, end_port, direction, cidr) {
    return this.__postRequest(`firewalls/${id}/rules`, { protocol, start_port, end_port, cidr, direction });
  }

  /**
   * @method CivoAPI~deleteFirewallRule deletes an existing firewall rule within a firewall
   * @param {String} firewall_id the firewalls id to be used to identify in civo
   * @param {String} id the firewall rules id in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  deleteFirewallRule(firewall_id, id) {
    return this.__deleteRequest(`firewalls/${firewall_id}/rules/${id}`);
  }

  // ----- Instance Sizes APIs ----- //

  /**
   * @method CivoAPI~listInstanceSizes gets an array of the currently available instance sizes on civo cloud
   * @returns {Promise} a promise wich resolves with the instance size list or rejects with an error
   */
  listInstanceSizes() {
    return this.__getRequest('sizes');
  }

  // ----- Instance Regions APIs ----- //

  /**
   * @method CivoAPI~listRegions gets an array of the currently available regions on civo cloud
   * @returns {Promise} a promise wich resolves with the available region list or rejects with an error
   */
  listRegions() {
    return this.__getRequest('regions');
  }

  // ----- Instance Templates APIs ----- //

  /**
   * @method CivoAPI~listTemplates gets an array of the currently available templates on civo cloud
   * @returns {Promise} a promise wich resolves with the available region list or rejects with an error
   */
  listTemplates() {
    return this.__getRequest('templates');
  }

  /**
   * @method CivoAPI~createTemplate creates a new template on the civo account
   * @param {String} name a readable name for the custom template
   * @param {String} image_id an openstack glance image id
   * @param {String} [short_description] an optional one line description of the template
   * @param {String} [description] an optional full description of the template
   * @param {String} [default_username] an optional udername to be created within the new template
   * @param {String} [cloud_config] an optional customisation script to run after the instance is first booted
   * @returns {Promise} a promise wich resolves with the available region list or rejects with an error
   */
  createTemplate(name, image_id, short_description, description, default_username, cloud_config) {
    return this.__postRequest('templates', { name, image_id, short_description, description, default_username, cloud_config })
  }

  /**
   * @method CivoAPI~deleteTemplate deletes an existing template within civo
   * @param {String} id the templates id to be used to identify the network in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  deleteTemplate(id) {
    return this.__deleteRequest(`templates/${id}`);
  }

  // ----- Quota APIs ----- //

  /**
   * @method Civo~getQuota gets an object of quota values
   * @returns {Promise}
   */
  getQuota() {
    return this.__getRequest('quota');
  }

  // ----- Charges APIs ----- //

  /**
   * @method Civo~listCharges gets an array of chargable service hours
   * @param {String|Date} [from] optional from date range
   * @param {String|Date} [to] optional to date range (max 31 days)
   * @returns {Promise}
   */
  listCharges(from, to) {
    return this.__getRequest('charges', {
      from: (from instanceof Date) ? from.toISOString() : from,
      to: (to instanceof Date) ? to.toISOString() : to
    });
  }
}

/**
 * @type {CivoAPI} module.exports exports the module for use within an application
 * @type {Object} module.exports.instanceSizes exports the names of the instance sizes
 */
module.exports = CivoAPI;
module.exports.instanceSizes = {
  XS: 'g1.xsmall',
  S: 'gl.small',
  M: 'gl.medium',
  L: 'gl.large'
};
