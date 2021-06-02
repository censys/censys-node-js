import CensysAsmAPI from "../api";
import { AsmApiOptions, Dict } from "../../types";

export default class Assets extends CensysAsmAPI {
  constructor(assetType: string, args: AsmApiOptions) {
    super(args);
    this.basePath = `/assets/${assetType}`;
  }

  async *getAssets(
    pageNumber = 1,
    pageSize: number = null
  ): AsyncGenerator<Dict, void, undefined> {
    yield* this.getPage(this.basePath, pageNumber, pageSize);
  }

  getAssetById(assetId: string): Promise<Dict> {
    return this.request(`${this.basePath}/${assetId}`);
  }

  getCommentById(assetId: string, commentId: string): Promise<Dict> {
    return this.request(`${this.basePath}/${assetId}/comments/${commentId}`);
  }

  addComment(assetId: string, comment: string): Promise<Dict> {
    return this.request(
      `${this.basePath}/${assetId}/comments`,
      {},
      { method: "POST", body: JSON.stringify({ markdown: comment }) }
    );
  }

  addTag(
    assetId: string,
    tagName: string,
    color: string = null
  ): Promise<Dict> {
    const data = { name: tagName };
    if (color) {
      data["color"] = color;
    }
    return this.request(
      `${this.basePath}/${assetId}/tags`,
      {},
      { method: "POST", body: JSON.stringify(data) }
    );
  }

  deleteTag(assetId: string, tagName: string): Promise<Dict> {
    return this.request(
      `${this.basePath}/${assetId}/tags/${tagName}`,
      {},
      { method: "DELETE" }
    );
  }
}
