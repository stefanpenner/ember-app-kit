var grunt = require('grunt');

module.exports = {
	options: {
    plugins: [
      {
        setup: require('api-fixture-proxy'),
        options: {
          host: 'http://example.com',
          namespace: '/api',
          fixtures: './fixtures'
        }
      }
    ]
	}
};
