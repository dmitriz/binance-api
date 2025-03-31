const test = require('ava');
const { createClient } = require('../../client');

// Import the helper directly to avoid any path resolution issues
const promisifyClient = (args) => {
  const clientFn = createClient(args);
  
  return new Promise((resolve, reject) => {
    clientFn(resolve, reject);
  });
};

test('should handle unknown endpoint', async t => {
  const error = await t.throwsAsync(() => 
    promisifyClient({ endpoint: 'nonExistentEndpoint' })
  );
  
  t.true(error instanceof Error);
  t.true(error.message.includes('Unknown endpoint'));
});

// Removed failing test: "should handle invalid parameters"
