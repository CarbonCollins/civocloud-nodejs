'use strict';

/**
 * @method NetworkMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
export default (SuperClass) => {
  /**
   * @class
   * @memberof module:CivoCloud/api
   * @augments module:CivoCloud/api.Civo
   * @see {@link https://www.civo.com/api/networks}
   */
  const Network = class extends SuperClass {
    /**
     * @method module:CivoCloud/api.Network~listNetworks
     * @see {@link https://www.civo.com/api/networks#listing-the-private-networks}
     * @description gets an array of the private networks on civo cloud [GET]
     * @returns {Promise} a promise wich resolves with the network list or rejects with an error
     * @public
     */
    listNetworks() {
      return this.getRequest('networks');
    }

    /**
     * @method module:CivoCloud/api.Network~createNetwork
     * @see {@link https://www.civo.com/api/networks#create-a-private-network}
     * @description creates a new private network in civo [POST]
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
     * @method module:CivoCloud/api.Network~renameNetwork
     * @see {@link https://www.civo.com/api/networks#renaming-a-network}
     * @description renames an existing network within civo [PUT]
     * @param {String} id the networks id to be used to identify the network in civo
     * @param {String} label the new label to be used for the network
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    renameNetwork(id, label) {
      return this.putRequest(`networks/${id}`, { label });
    }

    /**
     * @method module:CivoCloud/api.Network~deleteNetwork
     * @see {@link https://www.civo.com/api/networks#removing-a-private-network}
     * @description deletes an existing network within civo [DELETE]
     * @param {String} id the networks id to be used to identify the network in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    deleteNetwork(id) {
      return this.deleteRequest(`networks/${id}`);
    }
  };
  return Network;
};
