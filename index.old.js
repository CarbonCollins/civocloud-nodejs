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
