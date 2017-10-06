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

  // ----- Instance Templates APIs ----- //

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
