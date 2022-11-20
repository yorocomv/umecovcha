const Service = require('node-windows').Service;
const fs = require('path');
const ENV = require('./svc-env.cjs');

// Create a new service object
const svc = new Service({
  name:'__REST_API_SERVER__',
  description: 'The nodejs.org REST API web server.',
  script: fs.join(__dirname, '../dist/index.cjs'),
  env: ENV
});

module.exports = svc;
