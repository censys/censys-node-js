import Assets from "./base";
import { AsmApiOptions } from "../../types";

export default class HostsAssets extends Assets {
  constructor(args: AsmApiOptions) {
    super("hosts", args);
  }
}
