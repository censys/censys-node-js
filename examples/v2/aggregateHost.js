const { SearchClient } = require("@censys/node");

const c = new SearchClient({
  apiId: process.env.API_ID,
  apiSecret: process.env.API_SECRET,
});

c.v2.hosts
  .aggregate("service.service_name: HTTP", "services.port", 5)
  .then(console.log);
