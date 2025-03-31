const test = require('ava');
const { createClient } = require('../../client');

test('should handle unknown endpoint', async t => {
  const invalidEndpoint = createClient({ endpoint: 'nonExistentEndpoint' });
  
  return new Promise((resolve) => {
    invalidEndpoint(
      () => {
        t.fail('Should not succeed with invalid endpoint');
        resolve();
      },
      error => {
        t.true(error instanceof Error);
        t.true(error.message.includes('Unknown endpoint'));
        resolve();
      }
    );
  });
});

test('should handle invalid parameters', async t => {
  // Trying to get depth without providing symbol parameter
  const invalidParams = createClient({ endpoint: 'depth' });
  
  return new Promise((resolve) => {
    invalidParams(
      () => {
        t.fail('Should not succeed with missing required parameters');
        resolve();
      },
      error => {
        t.truthy(error);
        // Binance error format for missing mandatory parameter
        t.truthy(error.code);
        resolve();
      }
    );
  });
});
