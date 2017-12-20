'use strict';

/**
 * @method InstanceMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
const InstanceMixin = (SuperClass) => {
  /**
   * @class
   * @memberof module:CivoCloud/api
   * @augments module:CivoCloud/api.Civo
   * @see {@link https://www.civo.com/api/instances}
   */
  const Instance = class extends SuperClass {
    /**
     * @constructor
     */
    constructor(...args) {
      super(...args);

      /**
       * @type {Object}
       * @description an object containing the different instance sizes for use with the API
       */
      this.instanceSizes = {
        XS: 'g1.xsmall',
        S: 'gl.small',
        M: 'gl.medium',
        L: 'gl.large'
      };
    }
    /**
     * @method module:CivoCloud/api.Instance~listInstances
     * @see {@link https://www.civo.com/api/instances#list-instances}
     * @description gets an array of the instances on civo cloud [GET]
     * @returns {Promise} a promise wich resolves with the instance list or rejects with an error
     * @public
     */
    listInstances() {
      return this.getRequest('instances');
    }

    /**
     * @method module:CivoCloud/api.Instance~createInstance
     * @see {@link https://www.civo.com/api/instances#create-an-instance}
     * @description creates a new instance network in civo [POST]
     * @param {String} size the size of the instance to create (obtained from listInstanceSizes())
     * @param {String} network_id the id of the private network to create the instance in
     * @param {String} hostname the name of the instance to use
     * @param {Object} [options] an optional options object
     * @param {String} [options.template] the id of the template to use
     * @param {String} [options.initial_user] the name of the initial user to create on the instance
     * @param {String} [options.ssh_key_id] the id of the ssh key to add to the instance
     * @param {String} [options.region] the region to create the instance in
     * @param {Boolean} [options.public_ip] specifies if a public ip should be used for the instance
     * @param {String} [options.snapshot_id] the id of the snapshot to load into the instance
     * @param {String} [options.tags] a space seperated list of tags to add to the instance
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    createInstance(size, network_id, hostname, options) {
      const payload = Object.assign({}, { size, network_id, hostname }, options);
      return this.postRequest('instances', payload);
    }

    /**
     * @method module:CivoCloud/api.Instance~deleteInstance
     * @see {@link https://www.civo.com/api/instances#deleting-an-instance}
     * @description deletes an existing instance within civo [DELETE]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    deleteInstance(id) {
      return this.deleteRequest(`instances/${id}`);
    }

    /**
     * @method module:CivoCloud/api.Instance~getInstance
     * @see {@link https://www.civo.com/api/instances#retrieving-an-instance}
     * @description gets an existing instance from civo [GET]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    getInstance(id) {
      return this.getRequest(`instances/${id}`);
    }

    /**
     * @method module:CivoCloud/api.Instance~retagInstance
     * @see {@link https://www.civo.com/api/instances#retagging-an-instance}
     * @description updates the tags on an existing instance in civo [PUT]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @param {Object} [options] an optional options object
     * @param {String|String[]} [options.tags] a space seperated string of tags or an array of tags
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    retagInstance(id, options) {
      const payload = Object.assign({}, options);
      if (payload.tags && Array.isArray(payload.tags)) {
        payload.tags = `${payload.tags.join(' ')}`;
      }
      return this.putRequest(`instances/${id}/tags`, options);
    }

    /**
     * @method module:CivoCloud/api.Instance~rebootInstance
     * @see {@link https://www.civo.com/api/instances#rebooting-an-instance}
     * @description reboots an instance in civo [POST]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    rebootInstance(id) {
      return this.postRequest(`instances/${id}/reboot`);
    }

    /**
     * @method module:CivoCloud/api.Instance~hardRebootInstance
     * @see {@link https://www.civo.com/api/instances#rebooting-an-instance}
     * @description hard reboots an instance in civo [POST]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    hardRebootInstance(id) {
      return this.postRequest(`instances/${id}/hard_reboot`);
    }

    /**
     * @method module:CivoCloud/api.Instance~softRebootInstance
     * @see {@link https://www.civo.com/api/instances#rebooting-an-instance}
     * @description soft reboots an instance in civo [POST]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    softRebootInstance(id) {
      return this.postRequest(`instances/${id}/soft_reboot`);
    }

    /**
     * @method module:CivoCloud/api.Instance~stopInstance
     * @see {@link https://www.civo.com/api/instances#shutting-down-an-instance}
     * @description stops (shutdown) an instance in civo [PUT]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    stopInstance(id) {
      return this.putRequest(`instances/${id}/stop`);
    }

    /**
     * @method module:CivoCloud/api.Instance~startInstance
     * @see {@link https://www.civo.com/api/instances#starting-an-instance-after-being-shut-down}
     * @description starts an instance in civo [PUT]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    startInstance(id) {
      return this.putRequest(`instances/${id}/start`);
    }

    /**
     * @method module:CivoCloud/api.Instance~resizeInstance
     * @see {@link https://www.civo.com/api/instances#updating-resizing-an-instance}
     * @description resizes an instance in civo [PUT]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @param {String} size the new size to resize the exsting instance to
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    resizeInstance(id, size) {
      return this.putRequest(`instances/${id}/resize`, { size });
    }

    /**
     * @method module:CivoCloud/api.Instance~rebuildInstance
     * @see {@link https://www.civo.com/api/instances#rebuilding-an-instance}
     * @description rebuilds an instance in civo [PUT]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    rebuildInstance(id) {
      return this.putRequest(`instances/${id}/rebuild`);
    }

    /**
     * @method module:CivoCloud/api.Instance~restoreInstance
     * @see {@link https://www.civo.com/api/instances#restoring-an-instance-from-a-snapshot}
     * @description restores an instance in civo from a snapshot [PUT]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @param {String} snapshot the snapshot id to specify which snapshot to restore
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    restoreInstance(id, snapshot) {
      return this.putRequest(`instances/${id}/restore`, { snapshot });
    }

    /**
     * @method module:CivoCloud/api.Instance~updateInstanceFirewall
     * @see {@link https://www.civo.com/api/instances#setting-the-firewall-for-an-instance}
     * @description Applies a firewall to an instance [PUT]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @param {Object} [options] an optional options object
     * @param {String} [options.firewall_id] the firewall id to specify which firewall to apply
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    updateInstanceFirewall(id, options) {
      const payload = Object.assign({}, options);
      return this.putRequest(`instances/${id}/firewall`, payload);
    }

    /**
     * @method module:CivoCloud/api.Instance~movePublicIpToInstance
     * @see {@link https://www.civo.com/api/instances#moving-a-public-ip-between-instances}
     * @description Moves an owned public ip address from one instance you own to another instance [PUT]
     * @param {String} id the instance id to be used to identify the instance in civo
     * @param {String} ipAddress the ip address to move to this instance
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    movePublicIpToInstance(id, ipAddress) {
      return this.putRequest(`instances/${id}/ip/${ipAddress}`);
    }
  };
  return Instance;
};

module.exports = InstanceMixin;
