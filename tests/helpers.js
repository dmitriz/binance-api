const { createClient } = require('../client');

/**
 * Convert callback-based client to Promise-based for testing
 * @param {Object} args - Arguments including endpoint and parameters
 * @returns {Promise} A promise that resolves with the response or rejects with an error
 */
const promisifyClient = (args) => {
  const clientFn = createClient(args);
  
  return new Promise((resolve, reject) => {
    clientFn(resolve, reject);
  });
};

module.exports = {
  promisifyClient
};
