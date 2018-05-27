'use strict';

/**
 * @method LoadBallancerMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
export default (SuperClass) => {
  /**
   * @class
   * @memberof module:CivoCloud/api
   * @augments module:CivoCloud/api.Civo
   * @see {@link https://www.civo.com/api/loadbalancer}
   */
  const LoadBallancer = class extends SuperClass {
    /**
     * @method module:CivoCloud/api.LoadBallancer~listLoadBalancers
     * @see {@link https://www.civo.com/api/loadbalancer#list-load-balancers}
     * @description Lists all of the available load ballancers on the civo account [GET]
     * @returns {Promise} resolves with a list of available load balancers or rejects with an error
     * @public
     */
    listLoadBalancers() {
      return this.getRequest('loadbalancers');
    }

    /**
     * @method module:CivoCloud/api.LoadBallancer~createLoadBalancer
     * @see {@link https://www.civo.com/api/loadbalancer#setup-a-new-load-balancer}
     * @description Creates a new load ballancer on the civo account [POST]
     * @param {String} hostname the hostname to receive traffic on
     * @param {Backend[]} backends an array of backends to load ballance
     * @param {Object} [options] an optional object containing all optional parameters
     * @param {String} [options.protocol='http'] protocol to use (either 'http' or 'https')
     * @param {String} [options.tls_certificate] if protocol is https then base64-encoded certificate in PEM format 
     * @param {String} [options.tls_key] if protocol is https then base64-encoded key in PEM format
     * @param {String|Number} [options.port=80] the port to listen on
     * @param {Number} [options.max_request_size=20] the maximum request size in megabytes
     * @param {String} [options.policy='random'] routing policy can be either 'least_conn', 'random', 'round_robin', or 'ip_hash'
     * @param {String} [options.health_check_path='/'] what url to use on the backends to check status
     * @param {Number} [options.fail_timeout=30] how long to wait (in seconds) before determining backend failure
     * @param {Number} [options.max_conns=10] how many concurrent connections a backend can handle
     * @param {Boolean} [options.ignore_invalid_backend_tls=true] ignore invalid/self-signed tls certs on backend 
     * @returns {Promise} resolves when load balancer is created or rejects with an error
     * @public
     */
    createLoadBalancer(hostname, backends, options) {
      const payload = Object.assign({}, { hostname, backends }, options);
      return this.postRequest('loadbalancers', payload);
    }

    /**
     * @method module:CivoCloud/api.LoadBallancer~updateLoadBalancer
     * @see {@link https://www.civo.com/api/loadbalancer#update-a-load-balancer}
     * @description updates an existing load ballancer with new information [PUT]
     * @param {String} id the load balancers id to update
     * @param {Object} [options] an optional object containing all optional parameters
     * @param {String} [options.hostname] the hostname to receive traffic on
     * @param {Backend[]} [options.backends] an array of backends to load ballance
     * @param {String} [options.protocol] protocol to use (either 'http' or 'https')
     * @param {String} [options.tls_certificate] if protocol is https then base64-encoded certificate in PEM format 
     * @param {String} [options.tls_key] if protocol is https then base64-encoded key in PEM format
     * @param {String|Number} [options.port] the port to listen on
     * @param {Number} [options.max_request_size] the maximum request size in megabytes
     * @param {String} [options.policy] routing policy can be either 'least_conn', 'random', 'round_robin', or 'ip_hash'
     * @param {String} [options.health_check_path] what url to use on the backends to check status
     * @param {Number} [options.fail_timeout] how long to wait (in seconds) before determining backend failure
     * @param {Number} [options.max_conns] how many concurrent connections a backend can handle
     * @param {Boolean} [options.ignore_invalid_backend_tls] ignore invalid/self-signed tls certs on backend 
     * @returns {Promise} resolves when load balancer is created or rejects with an error
     * @public
     */
    updateLoadBalancer(id, options) {
      const payload = Object.assign({}, options);
      return this.putRequest(`loadbalancers/${id}`, payload);
    }

    /**
     * @method module:CivoCloud/api.LoadBallancer~deleteLoadBalancer
     * @see {@link https://www.civo.com/api/loadbalancer#deleting-a-load-balancer}
     * @description deletes an existing load ballancer from the civo account [DELETE]
     * @param {String} id the id for the load balancers to delete
     * @returns {Promise} resolves when load balancer is deleted or rejects with an error
     * @public
     */
    deleteLoadBalancer(id) {
      return this.deleteRequest(`loadbalancers/${id}`);
    }
  };
  return LoadBallancer;
};

/**
 * @typedef {Object} Backend
 * @property {String} [instance_id] the backend instance_id
 * @property {String} [protocol] the protocol to communicate with the backend on (either 'http' or 'https')
 * @property {Number} [port] the port to communicate with the backend on
 */
