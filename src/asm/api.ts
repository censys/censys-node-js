import BaseApi from "../base";
import { MissingAuthError } from "../errors";
import { AsmApiOptions, Dict } from "../types";

const BASE_URL = "https://app.censys.io/api/v1";
// const KEYWORDS = ["assets", "comments", "tags", "subdomains"];

export default class CensysAsmAPI extends BaseApi {
  basePath: string;

  constructor({ apiKey }: AsmApiOptions) {
    if (!apiKey) {
      throw new MissingAuthError("API Key");
    }
    super({ baseUrl: BASE_URL, headers: { "Censys-Api-Key": apiKey } });
  }

  async *getPage(
    path: string,
    pageNumber = 1,
    pageSize: number = null
  ): AsyncGenerator<Dict, void, undefined> {
    if (pageSize == null) {
      pageSize = 500;
    }

    let keyword = "assets";
    if (path.includes("comments")) {
      keyword = "comments";
    } else if (path.includes("tags")) {
      keyword = "tags";
    } else if (path.includes("subdomains")) {
      keyword = "subdomains";
    }

    let totalPages = Infinity;
    while (pageNumber <= totalPages) {
      const args = { pageNumber, pageSize };

      const res = await this.request(path, args);
      pageNumber = res.pageNumber + 1;
      totalPages = res.totalPages;

      yield* res[keyword];
    }
  }

  async *getLogbookPage(
    path: string,
    args: Dict
  ): AsyncGenerator<Dict, void, undefined> {
    let endOfEvents = false;

    while (!endOfEvents) {
      const res = await this.request(path, args);
      endOfEvents = res.endOfEvents;
      args = { ...args, cursor: res.nextCursor };

      yield* res.events;
    }
  }
}

module.exports = CensysAsmAPI;
