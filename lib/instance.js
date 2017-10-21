'use strict';
// /**
//  * @mixes InstanceAPI
//  * @desc provides instance API calls as a mixin so is not intended to be used directly
//  * @param {Class} SuperClass 
//  */
const instanceMixin = (SuperClass) => {
  /**
   * @mixin InstanceAPI
   */
  return class InstanceAPI extends SuperClass {
    /**
     * @method InstanceAPI~listInstances
     * @desc gets an array of the instances on civo cloud
     * @returns {Promise} a promise wich resolves with the instance list or rejects with an error
     * @public
     */
    listInstances() {
      return this.getRequest('instances');
    }

    /**
     * @method InstanceAPI~createInstance
     * @desc creates a new instance network in civo
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
     * @method InstanceAPI~deleteInstance
     * @desc deletes an existing instance within civo
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    deleteInstance(id) {
      return this.deleteRequest(`instances/${id}`);
    }

    /**
     * @method InstanceAPI~getInstance
     * @desc gets an existing instance from civo
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    getInstance(id) {
      return this.getRequest(`instances/${id}`);
    }

    /**
     * @method InstanceAPI~retagInstance
     * @desc updates the tags on an existing instance in civo
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
     * @method InstanceAPI~rebootInstance
     * @desc reboots an instance in civo
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    rebootInstance(id) {
      return this.postRequest(`instances/${id}/reboot`);
    }

    /**
     * @method InstanceAPI~hardRebootInstance
     * @desc hard reboots an instance in civo
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    hardRebootInstance(id) {
      return this.postRequest(`instances/${id}/hard_reboot`);
    }

    /**
     * @method InstanceAPI~softRebootInstance
     * @desc soft reboots an instance in civo
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    softRebootInstance(id) {
      return this.postRequest(`instances/${id}/soft_reboot`);
    }

    /**
     * @method InstanceAPI~stopInstance
     * @desc stops (shutdown) an instance in civo
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    stopInstance(id) {
      return this.putRequest(`instances/${id}/stop`);
    }

    /**
     * @method InstanceAPI~startInstance
     * @desc starts an instance in civo
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    startInstance(id) {
      return this.putRequest(`instances/${id}/start`);
    }

    /**
     * @method InstanceAPI~resizeInstance
     * @desc resizes an instance in civo
     * @param {String} id the instance id to be used to identify the instance in civo
     * @param {String} size the new size to resize the exsting instance to
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    resizeInstance(id, size) {
      return this.putRequest(`instances/${id}/resize`, { size });
    }

    /**
     * @method InstanceAPI~rebuildInstance
     * @desc rebuilds an instance in civo
     * @param {String} id the instance id to be used to identify the instance in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    rebuildInstance(id) {
      return this.putRequest(`instances/${id}/rebuild`);
    }

    /**
     * @method InstanceAPI~restoreInstance
     * @desc restores an instance in civo from a snapshot
     * @param {String} id the instance id to be used to identify the instance in civo
     * @param {String} snapshot the snapshot id to specify which snapshot to restore
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    restoreInstance(id, snapshot) {
      return this.putRequest(`instances/${id}/restore`, { snapshot });
    }

    /**
     * @method InstanceAPI~updateInstanceFirewall
     * @desc Applies a firewall to an instance
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
     * @method InstanceAPI~movePublicIpToInstance
     * @desc Moves an owned public ip address from one instance you own to another instance
     * @param {String} id the instance id to be used to identify the instance in civo
     * @param {String} ip_address the ip address to move to this instance
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    movePublicIpToInstance(id, ip_address) {
      return this.putRequest(`instances/${id}/ip/${ip_address}`);
    }
  };
}

module.exports = instanceMixin;
module.exports.instanceSizes = {
  XS: 'g1.xsmall',
  S: 'gl.small',
  M: 'gl.medium',
  L: 'gl.large'
};
