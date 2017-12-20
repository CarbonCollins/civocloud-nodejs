'use strict';

/**
 * @method ChargesMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
const ChargesMixin = (SuperClass) => {
  /**
   * @class
   * @memberof module:CivoCloud/api
   * @augments module:CivoCloud/api.Civo
   * @see {@link https://www.civo.com/api/charges}
   */
  const Charges = class extends SuperClass {
    /**
     * @method module:CivoCloud/api.Charges~listCharges
     * @description gets an array of chargable service hours [GET]
     * @see {@link https://www.civo.com/api/charges#listing-charges}
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
  };
  return Charges;
};

module.exports = ChargesMixin;
