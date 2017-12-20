'use strict';

const templateMixin = (SuperClass) => {
  /**
   * @mixin TemplateAPI
   */
  return class TemplateAPI extends SuperClass {
    /**
     * @method TemplateAPI~listTemplates
     * @see {@link https://www.civo.com/api/templates#listing-available-templates}
     * @description gets an array of the currently available templates on civo cloud
     * @returns {Promise} a promise wich resolves with the available region list or rejects with an
     * error
     * @public
     */
    listTemplates() {
      return this.getRequest('templates');
    }

    /**
     * @method TemplateAPI~createTemplate
     * @see {@link https://www.civo.com/api/templates#create-a-new-template}
     * @description creates a new template on the civo account
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
     * @method TemplateAPI~updateTemplate
     * @see {@link https://www.civo.com/api/templates#update-a-template}
     * @description updates an existing template on the civo account
     * @param {String} id the templates id to be used to identify the network in civo
     * @param {Object} [options] an optional object
     * @param {String} [options.name] a readable name for the custom template
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
    updateTemplate(id, options) {
      const payload = Object.assign({}, options);
      return this.putRequest(`templates/${id}`, payload)
    }

    /**
     * @method TemplateAPI~deleteTemplate
     * @see {@link https://www.civo.com/api/templates#deleting-a-template}
     * @description deletes an existing template within civo
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
