import moment from "moment";
import CensysAsmAPI from "./api";
import { AsmApiOptions, Dict } from "../types";

function formatSinceDate(since: string | Date): string {
  return moment(since).format("YYYY-MM-DD");
}
export default class Clouds extends CensysAsmAPI {
  constructor(args: AsmApiOptions) {
    super(args);
    this.basePath = "/clouds";
  }

  getHostCounts(since: string): Promise<Dict> {
    return this.request(
      `${this.basePath}/hostCounts/${formatSinceDate(since)}`
    );
  }

  getDomainCounts(since: string): Promise<Dict> {
    return this.request(
      `${this.basePath}/domainCounts/${formatSinceDate(since)}`
    );
  }

  getObjectStoreCounts(since: string): Promise<Dict> {
    return this.request(
      `${this.basePath}/objectStoreCounts/${formatSinceDate(since)}`
    );
  }

  getSubdomainCounts(since: string): Promise<Dict> {
    return this.request(
      `${this.basePath}/subdomainCounts/${formatSinceDate(since)}`
    );
  }

  getUnknownCounts(): Promise<Dict> {
    return this.request(`${this.basePath}/unknownCounts`);
  }
}
