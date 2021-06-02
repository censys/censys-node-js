import ClientV1 from "./v1";
import ClientV2 from "./v2";
import AsmClient from "./asm";
import { SearchApiOptions } from "./types";

export default class SearchClient {
  v1: ClientV1;
  v2: ClientV2;

  constructor(args: SearchApiOptions = {}) {
    this.v1 = new ClientV1(args);
    this.v2 = new ClientV2(args);
  }
}

export { ClientV1, ClientV2, AsmClient };
