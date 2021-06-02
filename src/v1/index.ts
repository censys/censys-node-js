import CensysCertificates from "./certificates";
import CensysData from "./data";
import CensysIPv4 from "./ipv4";
import CensysWebsites from "./websites";
import { SearchApiOptions } from "../types";

export default class ClientV1 {
  ipv4: CensysIPv4;
  certificates: CensysCertificates;
  websites: CensysWebsites;
  data: CensysData;

  constructor(args: SearchApiOptions = {}) {
    this.ipv4 = new CensysIPv4(args);
    this.certificates = new CensysCertificates(args);
    this.websites = new CensysWebsites(args);
    this.data = new CensysData(args);
  }
}

export { ClientV1, CensysIPv4, CensysCertificates, CensysWebsites, CensysData };
