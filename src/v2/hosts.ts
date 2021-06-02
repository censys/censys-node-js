import CensysApiV2 from "./api";
import { SearchApiOptions } from "../types";

export default class CensysHosts extends CensysApiV2 {
  constructor(args: SearchApiOptions) {
    super({ ...args, index: "hosts" });
  }
}
