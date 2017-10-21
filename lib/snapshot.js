'use strict';
// /**
//  * @mixes SnapshotAPI
//  * @desc provides snapshot API calls as a mixin so is not intended to be used directly
//  * @param {Class} SuperClass 
//  */
const snapshotMixin = (SuperClass) => {
  /**
   * @mixin SnapshotAPI
   */
  return class SnapshotAPI extends SuperClass {
    /**
     * @method SnapshotAPI~listSnapshots
     * @desc gets an array of the snapshots on civo account
     * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
     * @public
     */
    listSnapshots() {
      return this.getRequest('snapshots');
    }

    /**
     * @method SnapshotAPI~createSnapshot
     * @desc creates a snapshot of a given instance (alias of updateSnapshot)
     * @param {String} name the new name of the snapshot
     * @param {String} instance_id the id of the instance to be snapshotted
     * @param {Boolean} safe determins if an instance is stopped before snapshotting
     * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
     * @public
     */
    createSnapshot(name, instance_id, safe) {
      return this.updateSnapshot(name, instance_id, safe);
    }

    /**
     * @method SnapshotAPI~updateSnapshot
     * @desc updates a snapshot of a given instance
     * @param {String} name the new name of the snapshot
     * @param {String} instance_id the id of the instance to be snapshotted
     * @param {Boolean} safe determins if an instance is stopped before snapshotting
     * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
     * @public
     */
    updateSnapshot(name, instance_id, safe) {
      return this.putRequest(`snapshots/${name}`, { instance_id, safe });
    }

    /**
     * @method SnapshotAPI~deleteSnapshot
     * @desc deletes an existing snapshot within civo
     * @param {String} name the snapshots name to be used to identify the network in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    deleteSnapshot(name) {
      return this.deleteRequest(`snapshots/${name}`);
    }
  };
}

module.exports = snapshotMixin;
