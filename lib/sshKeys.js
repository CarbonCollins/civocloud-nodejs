'use strict';

/**
 * @method sshKeysMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
const sshKeysMixin = (SuperClass) => {
  /**
   * @class
   * @memberof module:CivoCloud/api
   * @augments module:CivoCloud/api.Civo
   * @see {@link https://www.civo.com/api/sshkeys}
   */
  const SSHKeys = class extends SuperClass {
    /**
     * @method module:CivoCloud/api.SSHKeys~listSSHKeys
     * @see {@link https://www.civo.com/api/sshkeys#listing-the-ssh-keys}
     * @description gets an array of the currently available ssh keys on civo cloud [GET]
     * @returns {Promise} a promise which resolves with the sshkeys list or rejects with an error
     * @public
     */
    listSSHKeys() {
      return this.getRequest('sshkeys');
    }

    /**
     * @method module:CivoCloud/api.SSHKeys~uploadSSHKey
     * @see {@link https://www.civo.com/api/sshkeys#uploading-an-ssh-key}
     * @description uploads a supplied ssh key into civo [POST]
     * @param {String} name the name to be used to identify the key in civo
     * @param {String} public_key the public key string to be uploaded
     * @returns {Promise} a promise wich resolves with the result and id or rejects with an error
     * @public
     */
    uploadSSHKey(name, public_key) {
      return this.postRequest('sshkeys', { name, public_key });
    }

    /**
     * @method module:CivoCloud/api.SSHKeys~deleteSSHKey
     * @see {@link https://www.civo.com/api/sshkeys#removing-an-ssh-key}
     * @description gets an array of the currently available ssh keys on civo cloud [DELETE]
     * @param {String} name the name of the public key to delete
     * @returns {Promise} a promise wich resolves with the sshkeys list or rejects with an error
     * @public
     */
    deleteSSHKey(name) {
      return this.deleteRequest(`sshkeys/${name}`);
    }
  };
  return SSHKeys;
};

module.exports = sshKeysMixin;
