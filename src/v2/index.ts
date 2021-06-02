import CensysHosts from "./hosts";
import { SearchApiOptions } from "../types";

export { CensysHosts };

export default class ClientV2 {
  hosts: CensysHosts;

  constructor(args: SearchApiOptions = {}) {
    this.hosts = new CensysHosts(args);
  }
}
