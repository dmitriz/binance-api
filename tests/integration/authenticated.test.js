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

// Test scenarios for order creation
const orderTestCases = [
  {
    name: 'buy limit',
    params: {
      side: 'BUY',
      type: 'LIMIT',
      timeInForce: 'GTC',
      price: '20000'
    }
  },
  {
    name: 'buy market',
    params: {
      side: 'BUY',
      type: 'MARKET'
    }
  },
  {
    name: 'sell limit',
    params: {
      side: 'SELL', 
      type: 'LIMIT',
      timeInForce: 'GTC',
      price: '30000'
    }
  },
  {
    name: 'sell market',
    params: {
      side: 'SELL',
      type: 'MARKET'
    }
  }
];

// Run tests for each test case
orderTestCases.forEach(({ name, params }) => {
  test(`should test ${name} order creation`, async t => {
    try {
      const response = await promisifyClient({
        endpoint: 'testOrder',
        symbol: 'BTCUSDT',
        quantity: '0.001',
        ...params
      });
      
      // Test order should either return empty object or order details
      t.truthy(response);
    } catch (error) {
      t.fail(JSON.stringify(error, null, 2));
    }
  });
});
