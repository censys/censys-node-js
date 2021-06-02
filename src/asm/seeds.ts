import CensysAsmAPI from "./api";
import { AsmApiOptions, Dict } from "../types";

export default class Seeds extends CensysAsmAPI {
  constructor(args: AsmApiOptions) {
    super(args);
    this.basePath = "/seeds";
  }

  async getSeeds(seedType: string = null): Promise<Dict[]> {
    const args = {};
    if (seedType) {
      args["type"] = seedType;
    }

    const res = await this.request(this.basePath, args);
    return res.seeds;
  }

  getSeedById(seedId: string | number): Promise<Dict> {
    return this.request(`${this.basePath}/${seedId}`);
  }

  addSeeds(seeds: Dict[], force: boolean = null): Promise<Dict> {
    const args = {};
    if (force != null) {
      args["force"] = force;
    }
    return this.request(this.basePath, args, {
      method: "POST",
      body: JSON.stringify({ seeds }),
    });
  }

  replaceSeedsByLabel(
    label: string,
    seeds: Dict[],
    force = null
  ): Promise<Dict> {
    const args = { label };
    if (force != null) {
      args["force"] = force;
    }
    return this.request(this.basePath, args, {
      method: "PUT",
      body: JSON.stringify({ seeds }),
    });
  }

  deleteSeedsByLabel(label: string): Promise<Dict> {
    return this.request(this.basePath, { label }, { method: "DELETE" });
  }

  deleteSeedById(seedId: string | number): Promise<Dict> {
    return this.request(`${this.basePath}/${seedId}`, {}, { method: "DELETE" });
  }
}

module.exports = Seeds;
