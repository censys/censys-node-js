import nock from "nock";
import { AsmClient } from "../../src/asm";
import { API_KEY } from "../consts";

const testCountJson = {
  totalAssetCount: 0,
  totalNewAssetCount: 0,
  totalCloudAssetCount: 0,
  totalCloudNewAssetCount: 0,
  assetCountByProvider: [
    { cloudProvider: "string", assetCount: 0, newAssetCount: 0 },
  ],
};

describe("#censys.asm.clouds", () => {
  const c = new AsmClient({ apiKey: API_KEY });
  const i = c.clouds;
  const scope = nock(i.baseUrl);

  it.each([["2021-01-01", "2021-01-01"]])(
    "get host counts",
    async (since, sinceStr) => {
      scope.get(`/clouds/hostCounts/${sinceStr}`).reply(200, testCountJson);
      const res = await i.getHostCounts(since);
      expect(res).toStrictEqual(testCountJson);
    }
  );

  it.each([["2021-01-01", "2021-01-01"]])(
    "get domain counts",
    async (since, sinceStr) => {
      scope.get(`/clouds/domainCounts/${sinceStr}`).reply(200, testCountJson);
      const res = await i.getDomainCounts(since);
      expect(res).toStrictEqual(testCountJson);
    }
  );

  it.each([["2021-01-01", "2021-01-01"]])(
    "get object store counts",
    async (since, sinceStr) => {
      scope
        .get(`/clouds/objectStoreCounts/${sinceStr}`)
        .reply(200, testCountJson);
      const res = await i.getObjectStoreCounts(since);
      expect(res).toStrictEqual(testCountJson);
    }
  );

  it.each([["2021-01-01", "2021-01-01"]])(
    "get subdomain counts",
    async (since, sinceStr) => {
      scope
        .get(`/clouds/subdomainCounts/${sinceStr}`)
        .reply(200, testCountJson);
      const res = await i.getSubdomainCounts(since);
      expect(res).toStrictEqual(testCountJson);
    }
  );

  it("get unknown counts", async () => {
    scope.get("/clouds/unknownCounts").reply(200, testCountJson);
    const res = await i.getUnknownCounts();
    expect(res).toStrictEqual(testCountJson);
  });
});
