'use strict';
/**
 * @mixin
 * @desc provides sshKey API calls as a mixin so is not intended to be used directly
 * @param {Class} SuperClass 
 */
const quotaMixin = (SuperClass) => { 
  /**
   * @class
   */
  return class Quota extends SuperClass {
    /**
     * @method Quota~getQuota gets an object of quota values
     * @returns {Promise}
     */
    getQuota() {
      return this.getRequest('quota');
    }
  };
}

module.exports = quotaMixin;
