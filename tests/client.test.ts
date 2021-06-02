import SearchClient from "../src";
import { API_ID, API_SECRET } from "./consts";

describe("#censys.client", () => {
  it("constructs properly", () => {
    const client = new SearchClient({ apiId: API_ID, apiSecret: API_SECRET });
    expect(client.v1).not.toBeUndefined();
    expect(client.v2).not.toBeUndefined();
  });

  it("missing apiId and apiSecret", () => {
    expect(() => new SearchClient()).toThrow(
      "No API ID or API Secret configured."
    );
  });
});
