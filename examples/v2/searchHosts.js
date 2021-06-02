const { SearchClient } = require("@censys/node");

const c = new SearchClient({
  apiId: process.env.API_ID,
  apiSecret: process.env.API_SECRET,
});

const hosts = c.v2.hosts;

// Single page of search results
let query1 = hosts.search("service.service_name: HTTP", 5);
query1.next().then((page) => console.log(page.value));

// Multiple pages of search results
let query2 = hosts.search("service.service_name: HTTP", 5, 2);
(async function () {
  for await (let page of query2) {
    console.log(page);
  }
})();
