const axios = require('axios');
const crypto = require('crypto');
const endpoints = require('./endpoints');
require('dotenv').config();

const API_KEY = process.env.BINANCE_API_KEY;
const API_SECRET = process.env.BINANCE_API_SECRET;
const API_URL = process.env.BINANCE_API_URL;

// Creates signature for authenticated endpoints
const createSignature = (queryString) => {
  return crypto
    .createHmac('sha256', API_SECRET)
    .update(queryString)
    .digest('hex');
};

// Curried function: single_args_object => (onres, onerr) => {}
const createClient = (args = {}) => {
  return (onResponse, onError) => {
    const { endpoint, ...params } = args;
    const endpointInfo = endpoints[endpoint];
    
    if (!endpointInfo) {
      return onError(new Error(`Unknown endpoint: ${endpoint}`));
    }
    
    const { url, method, auth } = endpointInfo;
    let fullUrl = `${API_URL}${url}`;
    let headers = { 'Content-Type': 'application/json' };
    let axiosConfig = { 
      method,
      url: fullUrl,
      headers
    };
    
    // Convert params to query string
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, value);
    });
    
    // Handle authentication if required
    if (auth) {
      headers['X-MBX-APIKEY'] = API_KEY;
      queryParams.append('timestamp', Date.now());
      const queryString = queryParams.toString();
      queryParams.append('signature', createSignature(queryString));
    }
    
    // Configure request based on method
    if (method === 'GET') {
      axiosConfig.params = Object.fromEntries(queryParams);
    } else {
      // For POST requests, handle differently
      if (auth) {
        // For authenticated POST requests, parameters need to be in the query string
        axiosConfig.url = `${fullUrl}?${queryParams.toString()}`;
      } else {
        // For non-authenticated POST requests, parameters go in the body
        axiosConfig.data = params;
      }
    }
    
    // Make the request
    axios(axiosConfig)
      .then(res => res.data)
      .then(onResponse)
      .catch(error => {
        if (error.response) {
          onError(error.response.data);
        } else {
          onError(error);
        }
      });
  };
};

module.exports = { createClient };
