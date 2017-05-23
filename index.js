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
const moment = require('moment');

let endpoint = 'https://api.civo.com/v2';

/**
 * @method handlerResponse handles the responses from the civo API
 * @param {Function} resolve a promise resolve callback
 * @param {Function} reject a promise reject callback
 */
function handleResponse(resolve, reject) {
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
 * @method getRequest performs a get request and formats the return body
 * @param {String} path the path to apply to the endpoint to query
 * @param {String} apiToken the api token supplied by civo
 * @returns {Promise} resolves with the body or rejects with an error
 */
function getRequest(path, apiToken) {
  return new Promise((resolve, reject) => {
    request
    .get(`${endpoint}/${path}`, {}, handleResponse(resolve, reject))
    .auth(null, null, true, apiToken);
  });
}
/**
 * @method postRequest performs a post request and formats the return body
 * @param {String} path the path to apply to the endpoint to query
 * @param {String} apiToken the api token supplied by 
 * @param {Object} form form data to be attached to the request
 * @returns {Promise} resolves with the body or rejects with an error
 */
function postRequest(path, apiToken, form) {
  return new Promise((resolve, reject) => {
    request
    .post(`${endpoint}/${path}`, {}, handleResponse(resolve, reject))
    .form(form)
    .auth(null, null, true, apiToken);
  });
}

/**
 * @method putRequest performs a put request and formats the return body
 * @param {String} path the path to apply to the endpoint to query
 * @param {String} apiToken the api token supplied by civo
 * @param {Object} form form data to be attached to the request
 * @returns {Promise} resolves with the body or rejects with an error
 */
function putRequest(path, apiToken, form) {
  return new Promise((resolve, reject) => {
    request
    .put(`${endpoint}/${path}`, {}, handleResponse(resolve, reject))
    .form(form)
    .auth(null, null, true, apiToken);
  });
}

/**
 * @method deleteRequest performs a put request and formats the return body
 * @param {String} path the path to apply to the endpoint to query
 * @param {String} apiToken the api token supplied by civo
 * @returns {Promise} resolves with the body or rejects with an error
 */
function deleteRequest(path, apiToken) {
  return new Promise((resolve, reject) => {
    request
    .delete(`${endpoint}/${path}`, {}, handleResponse(resolve, reject))
    .auth(null, null, true, apiToken);
  });
}

/**
 * @class {CivoAPI} 
 */
class CivoAPI {
  /**
   * @constructor {CivoAPI}
   * @param {String} apiToken the provided api token from your civo account
   * @param {String} url a custom url for testing
   */
  constructor(apiToken, url) {
    endpoint = url;
    this.apiToken = apiToken;
    if (!this.apiToken || this.apiToken === '') {
      throw new Error('invalid civo API key');
    }
  }

  // ----- SSH Keys APIs ----- //

  /**
   * @method CivoAPI~listSSHKeys gets an array of the currently available ssh keys on civo cloud
   * @returns {Promise} a promise wich resolves with the sshkeys list or rejects with an error
   */
  listSSHKeys() {
    return getRequest('sshkeys', this.apiToken);
  }

  /**
   * @method CivoAPI~uploadSSHKey uploads a supplied ssh key into civo
   * @param {String} name the name to be used to identify the key in civo
   * @param {String} public_key the public key string to be uploaded
   * @returns {Promise} a promise wich resolves with the result and id or rejects with an error
   */
  uploadSSHKey(name, public_key) {
    return postRequest('sshkeys', this.apiToken, { name, public_key });
  }

  // ----- Network APIs ----- //

  /**
   * @method CivoAPI~listNetworks gets an array of the private networks on civo cloud
   * @returns {Promise} a promise wich resolves with the network list or rejects with an error
   */
  listNetworks() {
    return getRequest('networks', this.apiToken);
  }

  /**
   * @method CivoAPI~createNetwork creates a new private network in civo
   * @param {String} label the name to be used to identify the key in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  createNetwork(label) {
    return postRequest('networks', this.apiToken, { label });
  }

  /**
   * @method CivoAPI~renameNetwork renames an existing network within civo
   * @param {String} id the networks id to be used to identify the network in civo
   * @param {String} label the new label to be used for the network
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  renameNetwork(id, label) {
    return putRequest(`networks/${id}`, this.apiToken, { label });
  }

  /**
   * @method CivoAPI~deleteNetwork deletes an existing network within civo
   * @param {String} id the networks id to be used to identify the network in civo
   * @returns {Promise} a promise wich resolves with the result or rejects with an error
   */
  deleteNetwork(id) {
    return deleteRequest(`networks/${id}`, this.apiToken);
  }

  // ----- Instance Sizes APIs ----- //

  /**
   * @method CivoAPI~listInstanceSizes gets an array of the currently available instance sizes on civo cloud
   * @returns {Promise} a promise wich resolves with the instance size list or rejects with an error
   */
  listInstanceSizes() {
    return getRequest('sizes', this.apiToken);
  }

  // ----- Instance Regions APIs ----- //

  /**
   * @method CivoAPI~listRegions gets an array of the currently available regions on civo cloud
   * @returns {Promise} a promise wich resolves with the available region list or rejects with an error
   */
  listRegions() {
    return getRequest('regions', this.apiToken);
  }

  // ----- Charges APIs ----- //

  /**
   * @method Civo~listCharges
   * @param {String} account_id
   * @param {String|Date} [from]
   * @param {String|Date} [to]
   * @returns {Promise}
   */
  listCharges(account_id, from, to) {
    let _from = from;
    let _to = to;
    if (from instanceof Date) { _from = from.toISOString(); }
    if (to instanceof Date) { _to = to.toISOString(); }
    return getRequest('charges', this.apiToken, { account_id, from: _from, to: _to });
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
