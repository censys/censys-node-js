import nock from "nock";
import CensysApiV2 from "../../src/v2/api";
import { API_ID, API_SECRET } from "../consts";

describe("#censys.v2.api", () => {
  const c = new CensysApiV2({
    apiId: API_ID,
    apiSecret: API_SECRET,
    index: "test",
  });
  const scope = nock(c.baseUrl);

  it("missing apiId and apiSecret", () => {
    expect(() => new CensysApiV2()).toThrow(
      "No API ID or API Secret configured."
    );
  });

  it("basic auth configured correctly", async () => {
    scope.get("/").basicAuth({ user: API_ID, pass: API_SECRET }).reply(200, {});
    await c.request("/");
    scope.done();
  });
});
