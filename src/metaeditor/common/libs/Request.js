/**
 * Usage:
 * 
 Request.GET(url='https://...').then(res => {
  if(res.status === 200) {
    console.log(res.body)
  }
}).catch(err => {
  console.error(err)
})
 */

import * as React from 'react';

const Request = new class {

  async request(method, url, getOptions = {}) {

    let options = {
      method,
      mode: 'cors',
      ...getOptions,
    }

    options.headers = new Headers({
      ...options.headers,
      'Origin': '',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })

    // body preparations
    if (method === 'POST' && options.body) {
      try { options.body = JSON.stringify(options.body) } catch (err) {
        console.error('Request', { method, err })
      }
    }

    try {
      const response = await fetch(url, options);
      const responseJson = await response.json();
      return {
        ok: response.status === 200,
        status: response.status,
        body: responseJson,
      }
    } catch (error) {
      console.error('Request', { error });
      return {
        status: error.status,
        error,
      };
    }

  }

  async GET(url, options) {
    return await this.request('GET', url, options);
  }

  async POST(url, body, options) {
    return await this.request('POST', url, { body, ...options });
  }

  async DELETE(url, options) {
    return await this.request('DELETE', url, options);
  }
}




export default Request
