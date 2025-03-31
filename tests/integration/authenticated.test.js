const test = require('ava');
const { promisifyClient } = require('../helpers');

test('should get account information', async t => {
  try {
    const response = await promisifyClient({ endpoint: 'account' });
    t.truthy(response);
    t.truthy(response.balances);
    t.true(Array.isArray(response.balances));
  } catch (error) {
    t.fail(JSON.stringify(error, null, 2));
  }
});

test('should test order creation', async t => {
  try {
    const response = await promisifyClient({
      endpoint: 'testOrder',
      symbol: 'BTCUSDT',
      side: 'BUY',
      type: 'LIMIT',
      timeInForce: 'GTC',
      quantity: '0.001',
      price: '20000'
    });
    
    // Test order should either return empty object or order details
    t.truthy(response);
  } catch (error) {
    t.fail(JSON.stringify(error, null, 2));
  }
});

test('should test limit order creation', async t => {
  try {
    const response = await promisifyClient({
      endpoint: 'testOrder',
      symbol: 'BTCUSDT',
      side: 'BUY',
      type: 'LIMIT',
      timeInForce: 'GTC',
      quantity: '0.001',
      price: '20000'
    });
    
    // Test order should either return empty object or order details
    t.truthy(response);
  } catch (error) {
    t.fail(JSON.stringify(error, null, 2));
  }
});

test('should test market order creation', async t => {
  try {
    const response = await promisifyClient({
      endpoint: 'testOrder',
      symbol: 'BTCUSDT',
      side: 'BUY',
      type: 'MARKET',
      quantity: '0.001'
    });
    
    // Test order should either return empty object or order details
    t.truthy(response);
  } catch (error) {
    // Stringify the error to make sure all properties are visible in test output
    t.fail(JSON.stringify(error, null, 2));
  }
});

test('should test sell limit order creation', async t => {
  try {
    const response = await promisifyClient({
      endpoint: 'testOrder',
      symbol: 'BTCUSDT',
      side: 'SELL',
      type: 'LIMIT',
      timeInForce: 'GTC',
      quantity: '0.001',
      price: '30000'  // Higher than current price for a sell order
    });
    
    // Test order should either return empty object or order details
    t.truthy(response);
  } catch (error) {
    // Stringify the error to make sure all properties are visible in test output
    t.fail(JSON.stringify(error, null, 2));
  }
});

test('should test sell market order creation', async t => {
  try {
    const response = await promisifyClient({
      endpoint: 'testOrder',
      symbol: 'BTCUSDT',
      side: 'SELL',
      type: 'MARKET',
      quantity: '0.001'
    });
    
    // Test order should either return empty object or order details
    t.truthy(response);
  } catch (error) {
    // Stringify the error to make sure all properties are visible in test output
    t.fail(JSON.stringify(error, null, 2));
  }
});
