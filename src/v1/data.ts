import CensysApiV1 from "./api";
import { SearchApiOptions, Dict } from "../types";

export default class CensysData extends CensysApiV1 {
  dataPath: string;

  constructor(args: SearchApiOptions) {
    super(args);
    this.dataPath = "/data";
  }

  getSeries(): Promise<Dict> {
    return this.request(this.dataPath);
  }

  viewSeries(seriesId: string): Promise<Dict> {
    return this.request(`${this.dataPath}/${seriesId}`);
  }

  viewResult(seriesId: string, resultId: string): Promise<Dict> {
    return this.request(`${this.dataPath}/${seriesId}/${resultId}`);
  }
}
