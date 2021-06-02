import moment from "moment";
import BaseApi from "../base";
import { SEARCH_DATETIME_FORMAT } from "../consts";
import { MissingAuthError } from "../errors";
import { SearchApiOptions, Dict } from "../types";

const BASE_URL = "https://search.censys.io/api/v2";

export default class CensysApiV2 extends BaseApi {
  INDEX: string;
  viewPath: string;
  searchPath: string;
  aggregatePath: string;

  constructor({ apiId, apiSecret, index = "hosts" }: SearchApiOptions = {}) {
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

  async *search(
    query: string,
    perPage = 100,
    pages = 1,
    cursor: string = null
  ): AsyncGenerator<Dict[], void, undefined> {
    const args: Dict = { q: query, per_page: perPage };
    let page = 1;
    while (page <= pages) {
      if (cursor) {
        args["cursor"] = cursor;
      }

      const res = await this.request(this.searchPath, args);
      page++;
      const result = res.result;
      cursor = result.links.next;
      yield result.hits;
    }
  }

  async view(documentId: string, atTime: string | Date = null): Promise<Dict> {
    const args = {};
    if (atTime) {
      args["at_time"] = moment(atTime).format(SEARCH_DATETIME_FORMAT) + "Z";
    }

    const res = await this.request(this.viewPath + documentId, args);
    return res.result;
  }

  async aggregate(
    query: string,
    field: string,
    numBuckets = 50
  ): Promise<Dict> {
    const args = { q: query, field, num_buckets: numBuckets };
    const res = await this.request(this.aggregatePath, args);
    return res.result;
  }
}
