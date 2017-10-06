/**
 * @name Request
 * @description provides all of the various request functions and all handeling to go with them.
 */

const request = require('request');


/**
 * @class
 */
class CivoRequest {
  /**
   * @constructor
   * @param {String} apiToken the provided api token from your civo account
   * @param {String} [endpoint='https://api.civo.com/v2'] An optional end point
   */
  constructor(apiToken = '', endpoint = 'https://api.civo.com/v2') {
    this.apiToken = apiToken;
    this.endpoint = endpoint;
    if (this.apiToken === '') {
      throw new Error('invalid civo API key');
    }
  }

  /**
   * @method CivoRequest~handleResponse
   * @desc handles the responses from the civo API
   * @param {Function} resolve a promise resolve callback
   * @param {Function} reject a promise reject callback
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
   * @method CivoRequest~getRequest
   * @desc performs a get request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @param {String|Object} [qs] an optional query string to attach to the request
   * @returns {Promise} resolves with the body or rejects with an error
   */
  getRequest(path, qs) {
    return new Promise((resolve, reject) => {
      request
        .get(`${this.endpoint}/${path}`, { qs }, this.handleResponse(resolve, reject))
        .auth(null, null, true, this.apiToken);
    });
  }

  /**
   * @method CivoRequest~postRequest
   * @desc performs a post request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @param {Object} form form data to be attached to the request
   * @returns {Promise} resolves with the body or rejects with an error
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
   * @method CivoRequest~putRequest
   * @desc performs a put request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @param {Object} form form data to be attached to the request
   * @returns {Promise} resolves with the body or rejects with an error
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
   * @method CivoRequest~deleteRequest
   * @desc performs a put request and formats the return body
   * @param {String} path the path to apply to the endpoint to query
   * @returns {Promise} resolves with the body or rejects with an error
   */
  deleteRequest(path) {
    return new Promise((resolve, reject) => {
      request
        .delete(`${this.endpoint}/${path}`, {}, this.handleResponse(resolve, reject))
        .auth(null, null, true, this.apiToken);
    });
  }
}

module.exports = CivoRequest;
