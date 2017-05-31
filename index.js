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
    this.apiToken = apiToken;
    this.endpoint = endpoint || 'https://api.civo.com/v2';
    if (!this.apiToken || this.apiToken === '') {
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
          if (res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 202) {
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
      request
      .post(`${this.endpoint}/${path}`, {}, this.__handleResponse(resolve, reject))
      .form(form)
      .auth(null, null, true, this.apiToken);
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
      request
      .put(`${this.endpoint}/${path}`, {}, this.__handleResponse(resolve, reject))
      .form(form)
      .auth(null, null, true, this.apiToken);
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
   * @method CivoAPI~listFirewallRules gets an array of the firewalls on civo account
   * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
   */
  listFirewallRules(id) {
    return this.__getRequest(`firewalls/${id}/rules`);
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
