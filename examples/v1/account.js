const { SearchClient } = require("@censys/node");

const c = new SearchClient({
  apiId: process.env.API_ID,
  apiSecret: process.env.API_SECRET,
});

c.v1.ipv4.account().then(console.log);
