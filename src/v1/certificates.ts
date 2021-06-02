import CensysApiV1 from "./api";
import { SearchApiOptions, Dict } from "../types";

export default class CensysCertificates extends CensysApiV1 {
  bulkPath: string;
  maxPerBulkRequest: number;

  constructor(args: SearchApiOptions) {
    super({ ...args, index: "certificates" });
    this.bulkPath = `/bulk/${this.INDEX}`;
    this.maxPerBulkRequest = 50;
  }

  async bulk(fingerprints: string[]): Promise<Dict> {
    let result = {};
    let start = 0;
    const end = this.maxPerBulkRequest;
    while (start < fingerprints.length) {
      const data = { fingerprints: fingerprints.slice(start, end) };
      const res = await this.request(
        this.bulkPath,
        {},
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      result = { ...result, ...res };
      start = end;
    }
    return result;
  }
}
