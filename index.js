'use strict';

const request = require('request');

const chargesMixin = require('./lib/charges');
const domainMixin = require('./lib/domain');
const firewallMixin = require('./lib/firewall');
const instanceMixin = require('./lib/instance');
const instanceRegionMixin = require('./lib/instanceRegion');
const instanceSizingMixin = require('./lib/instanceSizing');
const networkMixin = require('./lib/network');
const quotaMixin = require('./lib/quota');
const snapshotMixin = require('./lib/snapshot');
const sshKeyMixin = require('./lib/sshKeys');
const templateMixin = require('./lib/template');

const mix = (Superclass) => {
  return new MixinBuilder(Superclass);
};

class MixinBuilder {
  constructor(Superclass) {
    this.superclass = Superclass;
  }

  with(...mixins) {
    return mixins.reduce((c, mixin) => { return mixin(c); }, this.superclass);
  }
}

/**
 * @class
 * @classdesc The full class with all of the api functions
 * @mixes ChargesAPI
 * @mixes DomainAPI
 * @mixes FirewallAPI
 * @mixes InstanceAPI
 * @mixes InstanceRegionAPI
 * @mixes InstanceSizingAPI
 * @mixes NetworkAPI
 * @mixes QuotaAPI
 * @mixes SnapshotAPI
 * @mixes SSHKeysAPI
 * @mixes TemplateAPI
 */
class Civo {
  /**
   * @constructor
   * @param {String} apiToken the provided api token from your civo account
   * @param {String} [endpoint='https://api.civo.com/v2'] An optional end point
   * @lends 
   */
  constructor(apiToken, endpoint) {
    this.apiToken = apiToken || '';
    this.endpoint = endpoint || 'https://api.civo.com/v2';
    if (this.apiToken === '') {
      throw new Error('invalid civo API key');
    }
  }

  /**
   * @method Civo~handleResponse
   * @desc handles the responses from the civo API
   * @param {Function} resolve a promise resolve callback
   * @param {Function} reject a promise reject callback
   * @private
   */
  handleResponse(resolve, reject) {
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
   * @method Civo~getRequest
   * @desc performs a get request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @param {String|Object} [qs] an optional query string to attach to the request
   * @returns {Promise} resolves with the body or rejects with an error
   * @private
   */
  getRequest(path, qs) {
    return new Promise((resolve, reject) => {
      request
        .get(`${this.endpoint}/${path}`, { qs }, this.handleResponse(resolve, reject))
        .auth(null, null, true, this.apiToken);
    });
  }

  /**
   * @method Civo~postRequest
   * @desc performs a post request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @param {Object} form form data to be attached to the request
   * @returns {Promise} resolves with the body or rejects with an error
   * @private
   */
  postRequest(path, form) {
    return new Promise((resolve, reject) => {
      if (form) {
        request
          .post(`${this.endpoint}/${path}`, {}, this.handleResponse(resolve, reject))
          .form(form)
          .auth(null, null, true, this.apiToken);
      } else {
        request
          .post(`${this.endpoint}/${path}`, {}, this.handleResponse(resolve, reject))
          .auth(null, null, true, this.apiToken);
      }
    });
  }

  /**
   * @method Civo~putRequest
   * @desc performs a put request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @param {Object} form form data to be attached to the request
   * @returns {Promise} resolves with the body or rejects with an error
   * @private
   */
  putRequest(path, form) {
    return new Promise((resolve, reject) => {
      if (form) {
        request
          .put(`${this.endpoint}/${path}`, {}, this.handleResponse(resolve, reject))
          .form(form)
          .auth(null, null, true, this.apiToken);
      } else {
        request
          .put(`${this.endpoint}/${path}`, {}, this.handleResponse(resolve, reject))
          .auth(null, null, true, this.apiToken);
      }
    });
  }

  /**
   * @method Civo~deleteRequest
   * @desc performs a put request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @returns {Promise} resolves with the body or rejects with an error
   * @private
   */
  deleteRequest(path) {
    return new Promise((resolve, reject) => {
      request
        .delete(`${this.endpoint}/${path}`, {}, this.handleResponse(resolve, reject))
        .auth(null, null, true, this.apiToken);
    });
  }
}

module.exports = mix(Civo).with(
  chargesMixin,
  domainMixin,
  firewallMixin,
  instanceMixin,
  instanceRegionMixin,
  instanceSizingMixin,
  networkMixin,
  quotaMixin,
  snapshotMixin,
  sshKeyMixin,
  templateMixin
);

module.exports.instanceSizes = instanceMixin.instanceSizes;
