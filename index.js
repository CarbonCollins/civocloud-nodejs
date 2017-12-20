/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleResponse"] }] */

'use strict';

const request = require('request');

const chargesMixin = require('./lib/charges');
const domainMixin = require('./lib/domain');
const firewallMixin = require('./lib/firewall');
const instanceMixin = require('./lib/instance');
const instanceRegionMixin = require('./lib/instanceRegion');
const instanceSizingMixin = require('./lib/instanceSizing');
const loadBallancerMixin = require('./lib/loadBallancer');
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
 * @module CivoCloud/api
 * @description The CivoCloud/api module acts as an abstracton layer for accessing the various civo APIs
 * @see {@link https://www.civo.com/api}
 * @exports external:Civo
 */

/**
 * @class
 * @memberof module:CivoCloud/api
 */
class Civo {
  /**
   * @constructor
   * @param {Object} options
   * @param {String} options.apiToken the provided api token from your civo account
   * @param {String} [options.host=https://api.civo.com/v2] An optional end point
   * @param {String|Number} [options.port=443] an optional port to call
   */
  constructor(options = {}) {
    this.apiToken = options.apiToken || '';
    this.host = options.host || 'https://api.civo.com/v2';
    this.port = `${options.port || 443}`;
    if (this.apiToken === '') {
      throw new Error('invalid civo API key');
    }
  }

  /**
   * @method module:CivoCloud/api.Civo~handleResponse
   * @description handles the responses from the civo API
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
   * @method module:CivoCloud/api.Civo~getRequest
   * @description performs a get request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @param {String|Object} [qs] an optional query string to attach to the request
   * @returns {Promise} resolves with the body or rejects with an error
   * @private
   */
  getRequest(path, qs) {
    return new Promise((resolve, reject) => {
      request
        .get(`${this.host}:${this.port}/${path}`, { qs }, this.handleResponse(resolve, reject))
        .auth(null, null, true, this.apiToken);
    });
  }

  /**
   * @method module:CivoCloud/api.Civo~postRequest
   * @description performs a post request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @param {Object} form form data to be attached to the request
   * @returns {Promise} resolves with the body or rejects with an error
   * @private
   */
  postRequest(path, form) {
    return new Promise((resolve, reject) => {
      if (form) {
        request
          .post(`${this.host}:${this.port}/${path}`, {}, this.handleResponse(resolve, reject))
          .form(form)
          .auth(null, null, true, this.apiToken);
      } else {
        request
          .post(`${this.host}:${this.port}/${path}`, {}, this.handleResponse(resolve, reject))
          .auth(null, null, true, this.apiToken);
      }
    });
  }

  /**
   * @method module:CivoCloud/api.Civo~putRequest
   * @description performs a put request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @param {Object} form form data to be attached to the request
   * @returns {Promise} resolves with the body or rejects with an error
   * @private
   */
  putRequest(path, form) {
    return new Promise((resolve, reject) => {
      if (form) {
        request
          .put(`${this.host}:${this.port}/${path}`, {}, this.handleResponse(resolve, reject))
          .form(form)
          .auth(null, null, true, this.apiToken);
      } else {
        request
          .put(`${this.host}:${this.port}/${path}`, {}, this.handleResponse(resolve, reject))
          .auth(null, null, true, this.apiToken);
      }
    });
  }

  /**
   * @method module:CivoCloud/api.Civo~deleteRequest
   * @description performs a put request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @returns {Promise} resolves with the body or rejects with an error
   * @private
   */
  deleteRequest(path) {
    return new Promise((resolve, reject) => {
      request
        .delete(`${this.host}:${this.port}/${path}`, {}, this.handleResponse(resolve, reject))
        .auth(null, null, true, this.apiToken);
    });
  }
}

module.exports.Civo = mix(Civo).with(
  chargesMixin,
  domainMixin,
  firewallMixin,
  instanceMixin,
  instanceRegionMixin,
  instanceSizingMixin,
  loadBallancerMixin,
  networkMixin,
  quotaMixin,
  snapshotMixin,
  sshKeyMixin,
  templateMixin
);
