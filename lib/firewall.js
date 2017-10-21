'use strict';
// /**
//  * @mixes FirewallAPI
//  * @desc provides firewall API calls as a mixin so is not intended to be used directly
//  * @param {Class} SuperClass 
//  */
const firewallMixin = (SuperClass) => {
  /**
   * @mixin FirewallAPI
   */
  return class FirewallAPI extends SuperClass {
    /**
     * @method FirewallAPI~listFirewalls
     * @desc gets an array of the firewalls on civo account
     * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
     * @public
     */
    listFirewalls() {
      return this.getRequest('firewalls');
    }

    /**
     * @method FirewallAPI~createFirewall
     * @desc creates a new firewall in civo
     * @param {String} name the name to be used to identify the firewall in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    createFirewall(name) {
      return this.postRequest('firewalls', { name });
    }

    /**
     * @method FirewallAPI~deleteFirewall
     * @desc deletes an existing firewall within civo
     * @param {String} id the firewalls id to be used to identify the network in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    deleteFirewall(id) {
      return this.deleteRequest(`firewalls/${id}`);
    }

    /**
     * @method FirewallAPI~listFirewallRules
     * @desc gets an array of the firewalls rules on civo account
     * @param {String} id the firewalls id to be used to identify the network in civo
     * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
     * @public
     */
    listFirewallRules(id) {
      return this.getRequest(`firewalls/${id}/rules`);
    }

    /**
     * @method FirewallAPI~createFirewallRule
     * @desc creates a new firewall rule within an existing firewall
     * @param {String} id the Id for the firewall to create the rule in
     * @param {String|Number} start_port The single port or start of a range of ports to allows
     * @param {Object} options an optional object
     * @param {Stirng|Number} [options.end_port] the end of a range of ports
     * @param {String} [options.protocol] the protocol that the ule will allow e.g. 'tcp'
     * @param {String} [options.direction] the direction in which the rule applies to e.g. 'inwards'
     * @param {String} [options.cidr] a ip range in which the rule is applied to e.g. '0.0.0.0/0' for all
     * @returns {Promise} a promise wich resolves with a success or rejects with an error
     * @public
     */
    createFirewallRule(id, start_port, options) {
      const payload = Object.assign({}, { start_port }, options);
      return this.postRequest(`firewalls/${id}/rules`, payload);
    }

    /**
     * @method FirewallAPI~deleteFirewallRule
     * @desc deletes an existing firewall rule within a firewall
     * @param {String} firewall_id the firewalls id to be used to identify in civo
     * @param {String} id the firewall rules id in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    deleteFirewallRule(firewall_id, id) {
      return this.deleteRequest(`firewalls/${firewall_id}/rules/${id}`);
    }
  };
}

module.exports = firewallMixin;
