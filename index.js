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

const endpoint = 'https://api.civo.com/v2';

/**
 * @method getRequest
 * @description performs a get request and formats the return body
 * @param {String} path the path to apply to the endpoint to query
 * @param {String} apiToken the api token supplied by civo
 * @returns {Promise} resolves with the body or rejects with an error
 */
function getRequest(path, apiToken) {
  return new Promise((resolve, reject) => {
    request.get(`${endpoint}/${path}`, {}, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        try {
          if (res.statusCode === 200) {
            resolve(JSON.parse(body));
          } else {
            reject(JSON.parse(body));
          }
        } catch (error) {
          reject({ error, body });
        }
      }
    })
    .auth(null, null, true, apiToken);
  });
}

/**
 * @method postRequest
 * @description performs a post request and formats the return body
 * @param {String} path the path to apply to the endpoint to query
 * @param {String} apiToken the api token supplied by civo
 * @returns {Promise} resolves with the body or rejects with an error
 */
function postRequest(path, apiToken, form) {
  return new Promise((resolve, reject) => {
    request.post(`${endpoint}/${path}`, {}, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        try {
          if (res.statusCode === 200) {
            resolve(JSON.parse(body));
          } else {
            reject(JSON.parse(body));
          }
        } catch (error) {
          reject({ error, body });
        }
      }
    })
    .form(form)
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
   */
  constructor(apiToken) {
    this.apiToken = apiToken;
  }

  // ----- SSH Keys APIs ----- //

  /**
   * @method CivoAPI~listSSHKeys
   * @description gets an array of the currently available ssh keys on civo cloud
   * @returns {Promise} a promise wich resolves with the sshkeys list or rejects with an error
   */
  listSSHKeys() {
    return getRequest('sshkeys', this.apiToken);
  }

  /**
   * @method CivoAPI~uploadSSHKey
   * @description uploads a supplied ssh key into civo
   * @param {String} name the name to be used to identify the key in civo
   * @param {String} public_key the public key string to be uploaded
   * @returns {Promise} a promise wich resolves with the result and id or rejects with an error
   */
  uploadSSHKey(name, public_key) {
    return postRequest('sshkeys', this.apiToken, { name, public_key });
  }

  // ----- Network APIs ----- //

  /**
   * @method CivoAPI~listNetworks
   * @description gets an array of the private networks on civo cloud
   * @returns {Promise} a promise wich resolves with the network list or rejects with an error
   */
  listNetworks() {
    return getRequest('networks', this.apiToken);
  }

  // ----- Instance Sizes APIs ----- //

  /**
   * @method CivoAPI~listInstanceSizes
   * @description gets an array of the currently available instance sizes on civo cloud
   * @returns {Promise} a promise wich resolves with the instance size list or rejects with an error
   */
  listInstanceSizes() {
    return getRequest('sizes', this.apiToken);
  }

  // ----- Instance Regions APIs ----- //

  /**
   * @method CivoAPI~listRegions
   * @description gets an array of the currently available regions on civo cloud
   * @returns {Promise} a promise wich resolves with the available region list or rejects with an error
   */
  listRegions() {
    return getRequest('regions', this.apiToken);
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
