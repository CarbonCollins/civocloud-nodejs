'use strict';

/**
 * @method WebhookMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
const WebhookMixin = (SuperClass) => {
  /**
   * @class
   * @memberof module:CivoCloud/api
   * @augments module:CivoCloud/api.Civo
   * @see {@link https://www.civo.com/api/webhooks}
   */
  const Webhook = class extends SuperClass {
    /**
     * @method module:CivoCloud/api.Webhook~listWebhooks
     * @see {@link https://www.civo.com/api/webhooks#list-webhooks}
     * @description gets an array of the currently available ebhooks sizes on civo cloud [GET]
     * @returns {Promise} a promise wich resolves with the webhook list or rejects with an error
     * @public
     */
    listWebhooks() {
      return this.getRequest('webhooks');
    }

    /**
     * @method module:CivoCloud/api.Webhook~createWebhook
     * @see {@link https://www.civo.com/api/webhooks#create-a-new-webhook}
     * @description creates and registers a new webhook onto the civo account. [POST]
     * @param {String} url a url to send the webhook request too
     * @param {Object} [options] an object for options
     * @param {String[]|String} [options.events=all events] an array of event names to subscribe to
     * @param {String} [options.secret=random string] a secret to send with webhook requests
     * @returns {Promise} resolves with the newly created webhook or rejects with an error
     * @public
     */
    createWebhook(url, options = {}) {
      const events = (options.events && Array.isArray(options.events))
        ? options.events
        : [`${options.events || '*'}`];
      const payload = Object.assign({}, options, { events });
      return this.postRequest('webhooks', payload);
    }

    /**
     * @method module:CivoCloud/api.Webhook~deleteWebhook
     * @see {@link https://www.civo.com/api/webhooks#deleting-a-webhook}
     * @description deletes an existing webhook within civo [DELETE]
     * @param {String} id the webhook id to be used to identify which webhook to delete in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    deleteWebhook(id) {
      return this.deleteRequest(`webhooks/${id}`);
    }

    /**
     * @method module:CivoCloud/api.Webhook~testWebhook
     * @see {@link https://www.civo.com/api/webhooks#test-a-webhook}
     * @description sends a dummy payload to the specific webhook in order to test it [POST]
     * @param {String} id the id for the specific webhook to test
     * @returns {Promise} resolves when the tummy payload is sent or rejects with an error
     * @public
     */
    testWebhook(id) {
      return this.postRequest(`webhooks/${id}`);
    }

    /**
     * @method module:CivoCloud/api.Webhook~updateWebhook
     * @see {@link https://www.civo.com/api/webhooks#create-a-new-webhook}
     * @description creates and registers a new webhook onto the civo account. [PUT]
     * @param {String} id the id for the specific webhook
     * @param {Object} [options] an object for options
     * @param {String} [options.url] a url to send the webhook request too
     * @param {String[]|String} [options.events] an array of event names to subscribe to
     * @param {String} [options.secret] a secret to send with webhook requests
     * @returns {Promise} resolves with the newly created webhook or rejects with an error
     * @public
     */
    updateWebhook(id, options = {}) {
      const events = (options.events && Array.isArray(options.events))
        ? options.events
        : [`${options.events || undefined}`];
      const payload = Object.assign({}, options, { events });
      return this.putRequest(`webhooks/${id}`, payload);
    }
  };
  return Webhook;
};

module.exports = WebhookMixin;
