const test = require('ava');
const { promisifyClient } = require('../helpers');

test('should get server time', async t => {
  const response = await promisifyClient({ endpoint: 'time' });
  t.truthy(response);
  t.truthy(response.serverTime);
  t.is(typeof response.serverTime, 'number');
});

test('should ping server', async t => {
  const response = await promisifyClient({ endpoint: 'ping' });
  // Ping response should be an empty object
  t.deepEqual(response, {});
});

test('should get exchange info', async t => {
  const response = await promisifyClient({ endpoint: 'exchangeInfo' });
  t.truthy(response);
  t.true(Array.isArray(response.symbols));
  // Check if BTCUSDT exists in the symbols
  t.true(response.symbols.some(symbol => symbol.symbol === 'BTCUSDT'));
});

test('should get depth for a symbol', async t => {
  const response = await promisifyClient({ 
    endpoint: 'depth',
    symbol: 'BTCUSDT',
    limit: 5
  });
  
  t.truthy(response);
  t.truthy(response.bids);
  t.truthy(response.asks);
  t.true(Array.isArray(response.bids));
  t.true(Array.isArray(response.asks));
});

test('should get recent trades for a symbol', async t => {
  const response = await promisifyClient({ 
    endpoint: 'trades',
    symbol: 'BTCUSDT',
    limit: 5
  });
  
  t.truthy(response);
  t.true(Array.isArray(response));
  if (response.length > 0) {
    const trade = response[0];
    t.truthy(trade.id);
    t.truthy(trade.price);
    t.truthy(trade.qty);
    t.truthy(trade.time);
  }
});
