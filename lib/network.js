'use strict';

const networkMixin = (SuperClass) => {
  /**
   * @mixin NetworkAPI
   */
  return class NetworkAPI extends SuperClass {
    /**
     * @method NetworkAPI~listNetworks
     * @see {@link https://www.civo.com/api/networks#listing-the-private-networks}
     * @description gets an array of the private networks on civo cloud
     * @returns {Promise} a promise wich resolves with the network list or rejects with an error
     * @public
     */
    listNetworks() {
      return this.getRequest('networks');
    }

    /**
     * @method NetworkAPI~createNetwork
     * @see {@link https://www.civo.com/api/networks#create-a-private-network}
     * @description creates a new private network in civo
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
     * @see {@link https://www.civo.com/api/networks#renaming-a-network}
     * @description renames an existing network within civo
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
     * @see {@link https://www.civo.com/api/networks#removing-a-private-network}
     * @description deletes an existing network within civo
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
