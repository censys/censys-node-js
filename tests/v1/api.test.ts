import nock from "nock";
import CensysApiV1 from "../../src/v1/api";
import { API_ID, API_SECRET } from "../consts";

const accountJson = {
  email: "test@censys.io",
  first_login: "2020-01-12 12:00:00",
  last_login: "2021-01-12 12:00:00.000000",
  login: "test@censys.io",
  quota: {
    allowance: 500000,
    resets_at: "2021-01-12 12:00:00",
    used: 0,
  },
};

describe("#censys.v1.api", () => {
  const c = new CensysApiV1({ apiId: API_ID, apiSecret: API_SECRET });
  const scope = nock(c.baseUrl);
  scope.persist().get("/account").reply(200, accountJson);

  it("missing apiId and apiSecret", () => {
    expect(() => new CensysApiV1()).toThrow(
      "No API ID or API Secret configured."
    );
  });

  it("basic auth configured correctly", async () => {
    scope.get("/").basicAuth({ user: API_ID, pass: API_SECRET }).reply(200, {});
    const res = await c.request("/");
    expect(res).toStrictEqual({});
  });

  it("get account data", async () => {
    const res = await c.account();
    expect(res).toStrictEqual(accountJson);
  });

  it("get account quota", async () => {
    const res = await c.quota();
    expect(res).toStrictEqual(accountJson.quota);
  });
});
