import config from '@config'
import qs from 'query-string'
import fetch from 'node-fetch'

class Ajax {

  /**
   *
   * @param {string} path
   * @param {FormData|Object} [params]
   * @param {Object} [headers]
   * @returns {Promise<any>}
   */
  static async get(path, params, headers) {
    const options = { method: 'GET', headers }
    const res = await fetch(Ajax.preparePath(path, params), options)
    return await res.json()
  }

  /**
   *
   * @param {string} path
   * @param {FormData|Object} [params]
   * @param {Object} [headers]
   * @returns {Promise<any>}
   */
  static async post(path, params = {}, headers = {}) {
    const options = { method: 'POST' }
    if (params instanceof FormData) {
      options.body = params
      options.headers = headers
    } else {
      options.body = JSON.stringify(params)
      options.headers = Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, headers)
    }

    const res = await fetch(Ajax.preparePath(path), options)
    return await res.json()
  }

  /**
   *
   * @param {string} path
   * @param {Object} [params]
   * @returns {string}
   */
  static preparePath(path, params) {
    path = String(path).replace(/^(\/)|(\/)$/, '')
    const url = [config.apiUrl]
    if (path) {
      url.push(path)
    }
    if (params) {
      url.push(`?${qs.stringify(params)}`)
    }
    return url.join('/')
  }
}

export default Ajax