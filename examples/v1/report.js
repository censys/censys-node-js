const { SearchClient } = require("@censys/node");

const c = new SearchClient({
  apiId: process.env.API_ID,
  apiSecret: process.env.API_SECRET,
});

c.v1.websites
  .report(
    ' "welcome to" AND tags.raw: "http" ',
    "80.http.get.headers.server.raw",
    5
  )
  .then(console.log);
