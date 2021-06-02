import nock from "nock";
import { AsmClient } from "../../src";
import { API_KEY } from "../consts";

describe("#censys.asm.api", () => {
  const c = new AsmClient({ apiKey: API_KEY });
  const i = c.events;
  const scope = nock(i.baseUrl);

  it("missing apiKey", () => {
    expect(() => new AsmClient()).toThrow("No API Key configured.");
  });

  it("sets api key header", async () => {
    const testJson = { status: "checking header" };
    scope.matchHeader("Censys-Api-Key", API_KEY).get("/").reply(200, testJson);
    await i.request("/");
    scope.done();
  });

  it.each([["assets"], ["comments"], ["tags"], ["subdomains"]])(
    "get page keywords",
    async (keyword) => {
      const testPath = `/${keyword}`;
      const testJson = {
        pageNumber: 1,
        totalPages: 1,
      };
      testJson[keyword] = ["test1", "test2", "test3"];
      scope
        .get(testPath)
        .query({ pageNumber: 1, pageSize: 500 })
        .reply(200, testJson);
      const results = [];
      for await (const res of i.getPage(testPath)) results.push(res);
      expect(results).toStrictEqual(testJson[keyword]);
    }
  );

  it("get page keywords multi page", async () => {
    const testPath = "/assets";
    const testJson = {
      pageNumber: 1,
      totalPages: 3,
    };
    const testAssets1 = ["asset1", "asset2"];
    const testAssets2 = ["asset3", "asset4"];
    const testAssets3 = ["asset5", "asset6"];
    scope
      .get(testPath)
      .query({ pageNumber: 1, pageSize: 500 })
      .reply(200, { ...testJson, assets: testAssets1 });
    scope
      .get(testPath)
      .query({ pageNumber: 2, pageSize: 500 })
      .reply(200, { ...testJson, pageNumber: 2, assets: testAssets2 });
    scope
      .get(testPath)
      .query({ pageNumber: 3, pageSize: 500 })
      .reply(200, { ...testJson, pageNumber: 3, assets: testAssets3 });
    const results = [];
    for await (const res of i.getPage(testPath)) results.push(res);
    expect(results).toStrictEqual([
      ...testAssets1,
      ...testAssets2,
      ...testAssets3,
    ]);
  });
});
