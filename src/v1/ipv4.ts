import CensysApiV1 from "./api";
import { SearchApiOptions } from "../types";

export default class CensysIPv4 extends CensysApiV1 {
  constructor(args: SearchApiOptions) {
    super({ ...args, index: "ipv4" });
  }
}
