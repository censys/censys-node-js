import Clouds from "./clouds";
import Events from "./events";
import Seeds from "./seeds";
import { CertificatesAssets, DomainsAssets, HostsAssets } from "./assets";
import { AsmApiOptions } from "../types";

export default class AsmClient {
  certificates: CertificatesAssets;
  clouds: Clouds;
  domains: DomainsAssets;
  events: Events;
  hosts: HostsAssets;
  seeds: Seeds;

  constructor(args: AsmApiOptions = {}) {
    this.certificates = new CertificatesAssets(args);
    this.clouds = new Clouds(args);
    this.domains = new DomainsAssets(args);
    this.events = new Events(args);
    this.hosts = new HostsAssets(args);
    this.seeds = new Seeds(args);
  }
}

export {
  CertificatesAssets,
  AsmClient,
  Clouds,
  DomainsAssets,
  Events,
  HostsAssets,
  Seeds,
};
