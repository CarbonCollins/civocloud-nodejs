'use strict';

/**
 * @method DomainMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
const DomainMixin = (SuperClass) => {
  /**
   * @class
   * @memberof module:CivoCloud/api
   * @augments module:CivoCloud/api.Civo
   * @see {@link https://www.civo.com/api/dns}
   */
  const Domain = class extends SuperClass {
    /**
     * @method module:CivoCloud/api.Domain~listDomains
     * @see {@link https://www.civo.com/api/dns#list-domain-names}
     * @description gets an array of the domains on civo account [GET]
     * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
     * @public
     */
    listDomains() {
      return this.getRequest('dns');
    }

    /**
     * @method module:CivoCloud/api.Domain~createDomain
     * @see {@link https://www.civo.com/api/dns#setup-a-new-domain}
     * @description creates a new domain within civo [POST]
     * @param {String} name the ndomain name for the new domain
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    createDomain(name) {
      return this.postRequest('dns', { name });
    }

    /**
     * @method module:CivoCloud/api.Domain~deleteDomain
     * @see {@link https://www.civo.com/api/dns#deleting-a-domain}
     * @description removes a new domain within civo [DELETE]
     * @param {String} id the domain id to be deleted
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    deleteDomain(id) {
      return this.deleteRequest(`dns/${id}`);
    }

    /**
     * @method module:CivoCloud/api.Domain~listDomainRecords
     * @see {@link https://www.civo.com/api/dns#list-dns-records}
     * @description gets an array of the domains on civo account [GET]
     * @param {String} id the domains id to get the records in
     * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
     * @public
     */
    listDomainRecords(id) {
      return this.getRequest(`dns/${id}/records`);
    }

    /**
     * @method module:CivoCloud/api.Domain~createDomainRecord
     * @see {@link https://www.civo.com/api/dns#create-a-new-dns-record}
     * @description gets an array of the domains on civo account [POST]
     * @param {String} domainId the domain to delete the record from
     * @param {String} type the type of dns record to use which can be either: 'a', 'cname', 'mx', 
     * or 'txt'
     * @param {String} name the portion before the domain name (e.g. 'www', or '@')
     * @param {Stirng} value the ip address fr this dns record to serve
     * @param {Object} [options] an optional options object
     * @param {Number} [options.priority=10] mx records only but determines the priority of the 
     * @param {Number} [options.ttl=3600] the time to live for the dns record in seconds
     * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
     * @public
     */
    createDomainRecord(domainId, type, name, value, options) {
      const payload = Object.assign({}, { type, name, value }, options);
      return this.postRequest(`dns/${domainId}/records`, payload);
    }

    /**
     * @method module:CivoCloud/api.Domain~deleteDomainRecord
     * @see {@link https://www.civo.com/api/dns#deleting-a-dns-record}
     * @description removes a new domain within civo [DELETE]
     * @param {String} domainId the domain to delete the record from
     * @param {String} id the record to be deleted
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    deleteDomainRecord(domainId, id) {
      return this.deleteRequest(`dns/${domainId}/records/${id}`);
    }
  };
  return Domain;
};

module.exports = DomainMixin;
