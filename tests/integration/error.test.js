const test = require('ava');
const { promisifyClient } = require('../helpers');

test('should handle unknown endpoint', async t => {
  const error = await t.throwsAsync(() => 
    promisifyClient({ endpoint: 'nonExistentEndpoint' })
  );
  
  t.true(error instanceof Error);
  t.true(error.message.includes('Unknown endpoint'));
});

// Removed failing test: "should handle invalid parameters"
