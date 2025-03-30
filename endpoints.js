// Common Binance API endpoints
module.exports = {
  // Public endpoints
  ping: {
    url: '/api/v3/ping',
    method: 'GET',
    auth: false
  },
  time: {
    url: '/api/v3/time',
    method: 'GET',
    auth: false
  },
  exchangeInfo: {
    url: '/api/v3/exchangeInfo',
    method: 'GET',
    auth: false
  },
  depth: {
    url: '/api/v3/depth',
    method: 'GET',
    auth: false
  },
  trades: {
    url: '/api/v3/trades',
    method: 'GET',
    auth: false
  },
  
  // Authenticated endpoints
  account: {
    url: '/api/v3/account',
    method: 'GET',
    auth: true
  },
  order: {
    url: '/api/v3/order',
    method: 'POST',
    auth: true
  },
  testOrder: {
    url: '/api/v3/order/test',
    method: 'POST',
    auth: true
  },
  openOrders: {
    url: '/api/v3/openOrders',
    method: 'GET',
    auth: true
  }
};
