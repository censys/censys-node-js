import Assets from "./base";
import { AsmApiOptions, Dict } from "../../types";

export default class DomainsAssets extends Assets {
  constructor(args: AsmApiOptions) {
    super("domains", args);
  }

  async *getSubdomains(
    domain: string,
    pageNumber = 1,
    pageSize: number = null
  ): AsyncGenerator<Dict, void, undefined> {
    yield* this.getPage(
      `${this.basePath}/${domain}/subdomains`,
      pageNumber,
      pageSize
    );
  }
}
