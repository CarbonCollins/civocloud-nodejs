'use strict';
/**
 * @mixes QuotaAPI
 * @desc provides sshKey API calls as a mixin so is not intended to be used directly
 * @param {Class} SuperClass 
 */
const quotaMixin = (SuperClass) => { 
  /**
   * @mixin
   */
  return class QuotaAPI extends SuperClass {
    /**
     * @method Quota~getQuota
     * @desc gets an object of quota values
     * @returns {Promise}
     * @public
     */
    getQuota() {
      return this.getRequest('quota');
    }
  };
}

module.exports = quotaMixin;
