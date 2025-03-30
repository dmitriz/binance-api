const { createClient } = require('./index');

// Example 1: Get server time (public endpoint)
const getServerTime = createClient({ endpoint: 'time' });
getServerTime(
  response => console.log('Server time:', response),
  error => console.error('Error:', error)
);

// Example 2: Get account info (authenticated endpoint)
const getAccountInfo = createClient({ endpoint: 'account' });
getAccountInfo(
  response => console.log('Account info:', response),
  error => console.error('Error:', error)
);

// Example 3: Place a test order with parameters
const testOrder = createClient({
  endpoint: 'testOrder',
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  timeInForce: 'GTC',
  quantity: '0.001',
  price: '20000'
});

testOrder(
  response => console.log('Test order result:', response),
  error => console.error('Error:', error)
);
