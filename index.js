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
    request({
      method: 'GET',
      uri: `${endpoint}/${path}`,
      headers: {
        Authorization: `bearer ${apiToken}`
      }
    }, (err, res, body) => {
      if (err) {
        reject(err);
      } else if (res.statusCode === 200) {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }     
      } else {
        reject(body);
      }
    });
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

  /**
   * @method CivoAPI~getInstanceSizes
   * @description gets an array of the currently available instance sizes on civo cloud
   * @returns {Promise} a promise wich resolves with the instance size list or rejects with an error
   */
  getInstanceSizes() {
    return getRequest('sizes', this.apiToken);
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
