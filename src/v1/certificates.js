const CensysApiV1 = require("./api");

class CensysCertificates extends CensysApiV1 {
  constructor(args) {
    super({ ...args, index: "certificates" });
    this.bulkPath = `/bulk/${this.INDEX}`;
    this.maxPerBulkRequest = 50;
  }

  async bulk(fingerprints) {
    let result = {};
    let start = 0;
    let end = this.maxPerBulkRequest;
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

module.exports = CensysCertificates;
