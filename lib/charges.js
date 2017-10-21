'use strict';
// /**
//  * @mixes ChargesAPI
//  * @desc provides charges API calls as a mixin so is not intended to be used directly
//  * @param {Class} SuperClass 
//  */
const chargesMixin = (SuperClass) => { 
  /**
   * @mixin ChargesAPI
   */
  return class ChargesAPI extends SuperClass {
    /**
     * @method ChargesAPI~listCharges
     * @desc gets an array of chargable service hours
     * @param {Object} [options] an optional options object
     * @param {String|Date} [options.from] optional from date range
     * @param {String|Date} [options.to] optional to date range (max 31 days)
     * @returns {Promise}
     * @public
     */
    listCharges(options) {
      const payload = Object.assign({}, {
        from: (options.from instanceof Date) ? options.from.toISOString() : options.from,
        to: (options.to instanceof Date) ? options.to.toISOString() : options.to
      });
      return this.getRequest('charges', payload);
    }
  }
}

module.exports = chargesMixin;
