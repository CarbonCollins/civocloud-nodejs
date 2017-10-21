'use strict';
// /**
//  * @mixes TemplateAPI
//  * @desc provides template API calls as a mixin so is not intended to be used directly
//  * @param {Class} SuperClass 
//  */
const templateMixin = (SuperClass) => {
  /**
   * @mixin TemplateAPI
   */
  return class TemplateAPI extends SuperClass {
    /**
     * @method TemplateAPI~listTemplates
     * @desc gets an array of the currently available templates on civo cloud
     * @returns {Promise} a promise wich resolves with the available region list or rejects with an
     * error
     * @public
     */
    listTemplates() {
      return this.getRequest('templates');
    }

    /**
     * @method TemplateAPI~createTemplate
     * @desc creates a new template on the civo account
     * @param {String} name a readable name for the custom template
     * @param {String} image_id an openstack glance image id
     * @param {Object} [options] an optional object
     * @param {String} [options.short_description] an optional one line description of the template
     * @param {String} [options.description] an optional full description of the template
     * @param {String} [options.default_username] an optional udername to be created within the new
     * template
     * @param {String} [options.cloud_config] an optional customisation script to run after the
     * instance is first booted
     * @returns {Promise} a promise wich resolves with the available region list or rejects with an
     * error
     * @public
     */
    createTemplate(name, image_id, options) {
      const payload = Object.assign({}, { name, image_id }, options)
      return this.postRequest('templates', payload)
    }

    /**
     * @method TemplateAPI~deleteTemplate
     * @desc deletes an existing template within civo
     * @param {String} id the templates id to be used to identify the network in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    deleteTemplate(id) {
      return this.deleteRequest(`templates/${id}`);
    }
  };
}

module.exports = templateMixin;
