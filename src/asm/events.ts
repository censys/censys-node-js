import CensysAsmAPI from "./api";
import { AsmApiOptions, Dict } from "../types";

export default class Events extends CensysAsmAPI {
  constructor(args: AsmApiOptions) {
    super(args);
    this.basePath = "/logbook";
  }

  async getCursor(
    start: number | string | Date = null,
    filters = null
  ): Promise<string> {
    const data = {};
    if (typeof start === "number") {
      data["idFrom"] = start;
    } else if (start) {
      data["dateFrom"] = start;
    }
    if (filters) {
      data["filter"] = { type: filters };
    }

    const res = await this.request(
      this.basePath + "-cursor",
      {},
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return res.cursor;
  }

  async *getEvents(
    cursor: string = null
  ): AsyncGenerator<Dict, void, undefined> {
    const args = {};
    if (cursor) {
      args["cursor"] = cursor;
    }

    yield* this.getLogbookPage(this.basePath, args);
  }
}
