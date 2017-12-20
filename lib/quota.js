'use strict';

const quotaMixin = (SuperClass) => { 
  /**
   * @mixin QuotaAPI
   */
  return class QuotaAPI extends SuperClass {
    /**
     * @method QuotaAPI~getQuota
     * @see {@link https://www.civo.com/api/quota#determining-current-quota}
     * @description gets an object of quota values [GET]
     * @returns {Promise}
     * @public
     */
    getQuota() {
      return this.getRequest('quota');
    }
  };
}

module.exports = quotaMixin;
