'use strict';

/**
 * @method SnapshotMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
const SnapshotMixin = (SuperClass) => {
  /**
   * @class
   * @memberof module:CivoCloud/api
   * @augments module:CivoCloud/api.Civo
   * @see {@link https://www.civo.com/api/snapshot}
   */
  const Snapshot = class extends SuperClass {
    /**
     * @method module:CivoCloud/api.Snapshot~listSnapshots
     * @see {@link https://www.civo.com/api/snapshots#list-snapshots}
     * @description gets an array of the snapshots on civo account [GET]
     * @returns {Promise} a promise wich resolves with the foirewall list or rejects with an error
     * @public
     */
    listSnapshots() {
      return this.getRequest('snapshots');
    }

    /**
     * @method module:CivoCloud/api.Snapshot~createSnapshot
     * @see {@link https://www.civo.com/api/snapshots#create-a-new-or-update-an-old-snapshot}
     * @description creates a snapshot of a given instance (alias of updateSnapshot) [PUT]
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
     * @method module:CivoCloud/api.Snapshot~updateSnapshot
     * @see {@link https://www.civo.com/api/snapshots#create-a-new-or-update-an-old-snapshot}
     * @description updates a snapshot of a given instance [PUT]
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
     * @method module:CivoCloud/api.Snapshot~deleteSnapshot
     * @see {@link https://www.civo.com/api/snapshots#deleting-a-snapshot}
     * @description deletes an existing snapshot within civo [DELETE]
     * @param {String} name the snapshots name to be used to identify the network in civo
     * @returns {Promise} a promise wich resolves with the result or rejects with an error
     * @public
     */
    deleteSnapshot(name) {
      return this.deleteRequest(`snapshots/${name}`);
    }
  };
  return Snapshot;
};

module.exports = SnapshotMixin;
