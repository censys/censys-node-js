import CensysApiV1 from "./api";
import { SearchApiOptions } from "../types";

export default class CensysWebsites extends CensysApiV1 {
  constructor(args: SearchApiOptions) {
    super({ ...args, index: "websites" });
  }
}
