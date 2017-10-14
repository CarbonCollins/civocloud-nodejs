
/**
 * @mixin
 * @desc provides network API calls as a mixin so is not intended to be used directly
 * @param {Class} SuperClass 
 */
const networkMixin = (SuperClass) => {
  /**
   * @class
   */
  return class NetworkAPI extends SuperClass {
    /**
     * @method NetworkAPI~listNetworks
     * @desc gets an array of the private networks on civo cloud
     * @returns {Promise} a promise wich resolves with the network list or rejects with an error
     */
    listNetworks() {
      return this.getRequest('networks');
    }

    /**
     * @method NetworkAPI~createNetwork
     * @desc creates a new private network in civo
     * @param {String} label the name to be used to identify the key in civo
     * @param {String} [region] an optional region to create the network in
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     */
    createNetwork(label, region) {
      return this.postRequest('networks', { label, region });
    }

    /**
     * @method NetworkAPI~renameNetwork
     * @desc renames an existing network within civo
     * @param {String} id the networks id to be used to identify the network in civo
     * @param {String} label the new label to be used for the network
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     */
    renameNetwork(id, label) {
      return this.putRequest(`networks/${id}`, { label });
    }

    /**
     * @method NetworkAPI~deleteNetwork
     * @desc deletes an existing network within civo
     * @param {String} id the networks id to be used to identify the network in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     */
    deleteNetwork(id) {
      return this.deleteRequest(`networks/${id}`);
    }
  };
}

module.exports = networkMixin;
