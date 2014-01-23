var grunt = require('grunt');

module.exports = {
	options: {
    api: {
      method: "<%= package.api.method %>",		// stub or proxy
      host:   "<%= package.api.host %>",			// URL to the API server, if using APIMethod: 'proxy'
      namespace: "<%= package.api.namespace %>"
    }
	}
};