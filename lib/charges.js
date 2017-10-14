
/**
 * @mixin
 * @desc provides charges API calls as a mixin so is not intended to be used directly
 * @param {Class} SuperClass 
 */
const chargesMixin = (SuperClass) => { 
  /**
   * @class
   */
  return class Charges extends SuperClass {
    /**
     * @method Charges~listCharges gets an array of chargable service hours
     * @param {String|Date} [from] optional from date range
     * @param {String|Date} [to] optional to date range (max 31 days)
     * @returns {Promise}
     */
    listCharges(from, to) {
      return this.getRequest('charges', {
        from: (from instanceof Date) ? from.toISOString() : from,
        to: (to instanceof Date) ? to.toISOString() : to
      });
    }
  };
}

module.exports = chargesMixin;
