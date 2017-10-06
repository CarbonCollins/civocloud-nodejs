
/**
 * @mixin
 * @desc provides domain API calls as a mixin so is not intended to be used directly
 * @param {Class} SuperClass 
 */
const domainMixin = (SuperClass) => {
  /**
   * @class
   */
  return class DomainAPI extends SuperClass {
    /**
     * @method DomainAPI~listDomains
     * @desc gets an array of the domains on civo account
     * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
     */
    listDomains() {
      return this.__getRequest('dns');
    }

    /**
     * @method DomainAPI~createDomain
     * @desc creates a new domain within civo
     * @param {String} name the ndomain name for the new domain
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     */
    createDomain(name) {
      return this.__postRequest('dns', { name });
    }

    /**
     * @method DomainAPI~deleteDomain
     * @desc removes a new domain within civo
     * @param {String} id the domain id to be deleted
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     */
    deleteDomain(id) {
      return this.__deleteRequest(`dns/${id}`);
    }

    /**
     * @method DomainAPI~listDomainRecords
     * @desc gets an array of the domains on civo account
     * @param {String} id the domains id to get the records in
     * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
     */
    listDomainRecords(id) {
      return this.__getRequest(`dns/${id}/records`);
    }

    /**
     * @method DomainAPI~createDomainRecord
     * @desc gets an array of the domains on civo account
     * @param {String} domain_id the domain to delete the record from
     * @param {String} type the type of dns record to use which can be either: 'a', 'cname', 'mx', 
     * or 'txt'
     * @param {String} name the portion before the domain name (e.g. 'www', or '@')
     * @param {Stirng} value the ip address fr this dns record to serve
     * @param {Object} [options] an optional options object
     * @param {Number} [options.priority=10] mx records only but determines the priority of the 
     * @param {Number} [options.ttl=3600] the time to live for the dns record in seconds
     * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
     */
    createDomainRecord(domain_id, type, name, value, options) {
      const payload = Object.assign({}, { type, name, value }, options);
      return this.__postRequest(`dns/${domain_id}/records`, payload);
    }

    /**
     * @method DomainAPI~deleteDomainRecord
     * @desc removes a new domain within civo
     * @param {String} domain_id the domain to delete the record from
     * @param {String} id the record to be deleted
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     */
    deleteDomainRecord(domain_id, id) {
      return this.__deleteRequest(`dns/${domain_id}/records/${id}`);
    }
  };
}

module.exports = domainMixin;
