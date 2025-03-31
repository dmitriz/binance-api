const test = require('ava');
const { createClient } = require('../../client');

test('should get server time', async t => {
  const getServerTime = createClient({ endpoint: 'time' });
  
  return new Promise((resolve, reject) => {
    getServerTime(
      response => {
        t.truthy(response);
        t.truthy(response.serverTime);
        t.is(typeof response.serverTime, 'number');
        console.log('Server time test passed');
        resolve();
      },
      error => {
        reject(error);
      }
    );
  });
});

test('should ping server', async t => {
  const pingServer = createClient({ endpoint: 'ping' });
  
  return new Promise((resolve, reject) => {
    pingServer(
      response => {
        // Ping response should be an empty object
        t.deepEqual(response, {});
        console.log('Ping test passed');
        resolve();
      },
      error => {
        reject(error);
      }
    );
  });
});

test('should get exchange info', async t => {
  const getExchangeInfo = createClient({ endpoint: 'exchangeInfo' });
  
  return new Promise((resolve, reject) => {
    getExchangeInfo(
      response => {
        t.truthy(response);
        t.true(Array.isArray(response.symbols));
        // Check if BTCUSDT exists in the symbols
        t.true(response.symbols.some(symbol => symbol.symbol === 'BTCUSDT'));
        console.log('Exchange info test passed');
        resolve();
      },
      error => {
        reject(error);
      }
    );
  });
});

test('should get depth for a symbol', async t => {
  const getDepth = createClient({ 
    endpoint: 'depth',
    symbol: 'BTCUSDT',
    limit: 5
  });
  
  return new Promise((resolve, reject) => {
    getDepth(
      response => {
        t.truthy(response);
        t.truthy(response.bids);
        t.truthy(response.asks);
        t.true(Array.isArray(response.bids));
        t.true(Array.isArray(response.asks));
        console.log('Depth test passed');
        resolve();
      },
      error => {
        reject(error);
      }
    );
  });
});

test('should get recent trades for a symbol', async t => {
  const getTrades = createClient({ 
    endpoint: 'trades',
    symbol: 'BTCUSDT',
    limit: 5
  });
  
  return new Promise((resolve, reject) => {
    getTrades(
      response => {
        t.truthy(response);
        t.true(Array.isArray(response));
        if (response.length > 0) {
          const trade = response[0];
          t.truthy(trade.id);
          t.truthy(trade.price);
          t.truthy(trade.qty);
          t.truthy(trade.time);
        }
        console.log('Trades test passed');
        resolve();
      },
      error => {
        reject(error);
      }
    );
  });
});
