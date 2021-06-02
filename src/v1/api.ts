import BaseApi from "../base";
import { MissingAuthError } from "../errors";
import { SearchApiOptions, Dict } from "../types";

const BASE_URL = "https://censys.io/api/v1";

export default class CensysApiV1 extends BaseApi {
  INDEX: string;
  viewPath: string;
  searchPath: string;
  reportPath: string;

  constructor({ apiId, apiSecret, index = "ipv4" }: SearchApiOptions = {}) {
    if (!apiId || !apiSecret) {
      throw new MissingAuthError();
    }
    const auth =
      "Basic " + Buffer.from(apiId + ":" + apiSecret).toString("base64");
    super({ baseUrl: BASE_URL, headers: { Authorization: auth } });

    this.INDEX = index;
    this.searchPath = `/search/${this.INDEX}`;
    this.viewPath = `/view/${this.INDEX}`;
    this.reportPath = `/report/${this.INDEX}`;
  }

  async account(): Promise<Dict> {
    return await this.request("/account");
  }

  async quota(): Promise<Dict> {
    const res = await this.account();
    return res.quota;
  }

  async *search(
    query: string,
    fields: string[] = [],
    maxRecords: number = null,
    page = 1,
    flatten = false
  ): AsyncGenerator<Dict, void, undefined> {
    let pages = Infinity;
    const data = { query, page, fields, flatten };

    let count = 0;
    while (page <= pages) {
      const res = await this.request(
        this.searchPath,
        {},
        { method: "POST", body: JSON.stringify(data) }
      );
      pages = res.metadata.pages;
      page++;
      data["page"] = page;

      for (const r of res.results) {
        yield r;
        count++;
        if (maxRecords && count >= maxRecords) return;
      }
    }
  }

  view(documentId: string): Promise<Dict> {
    return this.request(this.viewPath + "/" + documentId);
  }

  report(query: string, field: string, numBuckets = 50): Promise<Dict> {
    const data = { query, field, buckets: numBuckets };
    return this.request(
      this.reportPath,
      {},
      { method: "POST", body: JSON.stringify(data) }
    );
  }
}

module.exports = CensysApiV1;
