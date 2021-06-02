import Assets from "./base";
import { AsmApiOptions } from "../../types";

export default class CertificatesAssets extends Assets {
  constructor(args: AsmApiOptions) {
    super("certificates", args);
  }
}
