'use strict';
// /**
//  * @mixes NetworkAPI
//  * @desc provides network API calls as a mixin so is not intended to be used directly
//  * @param {Class} SuperClass 
//  */
const networkMixin = (SuperClass) => {
  /**
   * @mixin NetworkAPI
   */
  return class NetworkAPI extends SuperClass {
    /**
     * @method NetworkAPI~listNetworks
     * @desc gets an array of the private networks on civo cloud
     * @returns {Promise} a promise wich resolves with the network list or rejects with an error
     * @public
     */
    listNetworks() {
      return this.getRequest('networks');
    }

    /**
     * @method NetworkAPI~createNetwork
     * @desc creates a new private network in civo
     * @param {String} label the name to be used to identify the key in civo
     * @param {Object} [options] an optional options object
     * @param {String} [options.region] an optional region to create the network in
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    createNetwork(label, options) {
      const payload = Object.assign({}, { label }, options); 
      return this.postRequest('networks', payload);
    }

    /**
     * @method NetworkAPI~renameNetwork
     * @desc renames an existing network within civo
     * @param {String} id the networks id to be used to identify the network in civo
     * @param {String} label the new label to be used for the network
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    renameNetwork(id, label) {
      return this.putRequest(`networks/${id}`, { label });
    }

    /**
     * @method NetworkAPI~deleteNetwork
     * @desc deletes an existing network within civo
     * @param {String} id the networks id to be used to identify the network in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    deleteNetwork(id) {
      return this.deleteRequest(`networks/${id}`);
    }
  };
}

module.exports = networkMixin;
