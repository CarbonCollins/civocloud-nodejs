/* eslint camelcase: [2, { properties: "never" }] */

/**
 * @method FirewallMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
export default (SuperClass) => {
  /**
   * @class
   * @memberof module:CivoCloud/api
   * @augments module:CivoCloud/api.Civo
   * @see {@link https://www.civo.com/api/firewall}
   */
  const Firewall = class extends SuperClass {
    /**
     * @method module:CivoCloud/api.Firewall~listFirewalls
     * @see {@link https://www.civo.com/api/firewall#list-firewalls}
     * @description gets an array of the firewalls on civo account [GET]
     * @returns {Promise} a promise which resolves with the firewall list or rejects with an error
     * @public
     */
    listFirewalls() {
      return this.getRequest('firewalls');
    }

    /**
     * @method module:CivoCloud/api.Firewall~createFirewall
     * @see {@link https://www.civo.com/api/firewall#create-a-new-firewall}
     * @description creates a new firewall in civo [POST]
     * @param {String} name the name to be used to identify the firewall in civo
     * @returns {Promise} a promise which resolves with the result or rejects with an error
     * @public
     */
    createFirewall(name) {
      return this.postRequest('firewalls', { name });
    }

    /**
     * @method module:CivoCloud/api.Firewall~deleteFirewall
     * @see {@link https://www.civo.com/api/firewall#deleting-a-firewall}
     * @description deletes an existing firewall within civo [DELETE]
     * @param {String} id the firewalls id to be used to identify the network in civo
     * @returns {Promise} a promise which resolves with the result or rejects with an error
     * @public
     */
    deleteFirewall(id) {
      return this.deleteRequest(`firewalls/${id}`);
    }

    /**
     * @method module:CivoCloud/api.Firewall~listFirewallRules
     * @see {@link https://www.civo.com/api/firewall#list-firewall-rules}
     * @description gets an array of the firewalls rules on civo account [GET]
     * @param {String} id the firewalls id to be used to identify the network in civo
     * @returns {Promise} a promise which resolves with the firewall list or rejects with an error
     * @public
     */
    listFirewallRules(id) {
      return this.getRequest(`firewalls/${id}/rules`);
    }

    /**
     * @method module:CivoCloud/api.Firewall~createFirewallRule
     * @see {@link https://www.civo.com/api/firewall#create-a-new-firewall-rule}
     * @description creates a new firewall rule within an existing firewall [POST]
     * @param {String} id the Id for the firewall to create the rule in
     * @param {String|Number} start_port The single port or start of a range of ports to allows
     * @param {Object} [options] an optional object
     * @param {Stirng|Number} [options.end_port] the end of a range of ports
     * @param {String} [options.protocol] the protocol that the ule will allow e.g. 'tcp'
     * @param {String} [options.direction] the direction in which the rule applies to e.g. 'inwards'
     * @param {String} [options.cidr] a ip range in which the rule is applied to e.g. '0.0.0.0/0'
     * for all
     * @returns {Promise} a promise which resolves with a success or rejects with an error
     * @public
     */
    createFirewallRule(id, start_port, options) {
      const payload = Object.assign({}, { start_port }, options);
      return this.postRequest(`firewalls/${id}/rules`, payload);
    }

    /**
     * @method module:CivoCloud/api.Firewall~deleteFirewallRule
     * @see {@link https://www.civo.com/api/firewall#deleting-a-firewall-rule}
     * @description deletes an existing firewall rule within a firewall [DELETE]
     * @param {String} firewallId the firewalls id to be used to identify in civo
     * @param {String} id the firewall rules id in civo
     * @returns {Promise} a promise which resolves with the result or rejects with an error
     * @public
     */
    deleteFirewallRule(firewallId, id) {
      return this.deleteRequest(`firewalls/${firewallId}/rules/${id}`);
    }
  };
  return Firewall;
};
