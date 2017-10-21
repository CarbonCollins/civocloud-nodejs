'use strict';
/**
 * @mixin
 * @desc provides sshKey API calls as a mixin so is not intended to be used directly
 * @param {Class} SuperClass 
 */
const sshKeysMixin = (SuperClass) => { 
  /**
   * @class
   */
  return class SSHKeys extends SuperClass {
    /**
     * @method SSHKeys~listSSHKeys gets an array of the currently available ssh keys on civo cloud
     * @returns {Promise} a promise which resolves with the sshkeys list or rejects with an error
     */
    listSSHKeys() {
      return this.getRequest('sshkeys');
    }

    /**
     * @method SSHKeys~uploadSSHKey uploads a supplied ssh key into civo
     * @param {String} name the name to be used to identify the key in civo
     * @param {String} public_key the public key string to be uploaded
     * @returns {Promise} a promise wich resolves with the result and id or rejects with an error
     */
    uploadSSHKey(name, public_key) {
      return this.postRequest('sshkeys', { name, public_key });
    }

    /**
     * @method SSHKeys~listSSHKeys gets an array of the currently available ssh keys on civo cloud
     * @param {String} name the name of the public key to delete
     * @returns {Promise} a promise wich resolves with the sshkeys list or rejects with an error
     */
    deleteSSHKey(name) {
      return this.deleteRequest(`sshkeys/${name}`);
    }
  };
}

module.exports = sshKeysMixin;
