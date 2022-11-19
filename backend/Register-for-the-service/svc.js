const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name:'__REST_API_SERVER__',
  description: 'The nodejs.org REST API web server.',
  script: require('path').join(__dirname, '../dist/index.cjs')
});

module.exports = svc;
