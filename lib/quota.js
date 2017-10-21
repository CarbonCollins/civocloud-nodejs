'use strict';

const quotaMixin = (SuperClass) => { 
  /**
   * @mixin QuotaAPI
   */
  return class QuotaAPI extends SuperClass {
    /**
     * @method QuotaAPI~getQuota
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
