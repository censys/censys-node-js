const moment = require("moment");
const BaseApi = require("../base");
const { SEARCH_DATETIME_FORMAT } = require("../consts");
const { MissingAuthError } = require("../errors");

const BASE_URL = "https://search.censys.io/api/v2";

class CensysApiV2 extends BaseApi {
  constructor({ apiId, apiSecret, index = "hosts" } = {}) {
    if (!apiId || !apiSecret) {
      throw new MissingAuthError();
    }
    const auth =
      "Basic " + Buffer.from(apiId + ":" + apiSecret).toString("base64");
    const headers = { Authorization: auth };
    super({ baseUrl: BASE_URL, headers });

    this.INDEX = index;
    this.viewPath = `/${this.INDEX}/`;
    this.searchPath = `/${this.INDEX}/search`;
    this.aggregatePath = `/${this.INDEX}/aggregate`;
  }

  async *search(query, perPage = 100, pages = 1, cursor = null) {
    const args = { q: query, per_page: perPage };
    let page = 1;
    while (page <= pages) {
      if (cursor) {
        args["cursor"] = cursor;
      }

      const res = await this.request(this.searchPath, args);
      page++;
      let result = res.result;
      cursor = result.links.next;
      yield result.hits;
    }
  }

  async view(documentId, atTime = null) {
    const args = {};
    if (atTime) {
      args["at_time"] = moment(atTime).format(SEARCH_DATETIME_FORMAT) + "Z";
    }

    const res = await this.request(this.viewPath + documentId, args);
    return res.result;
  }

  async aggregate(query, field, numBuckets = 50) {
    const args = { q: query, field, num_buckets: numBuckets };
    const res = await this.request(this.aggregatePath, args);
    return res.result;
  }
}

module.exports = CensysApiV2;
