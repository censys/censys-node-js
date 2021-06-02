import nock from "nock";
import { AsmClient } from "../../src/asm";
import { API_KEY } from "../consts";

const getSeedJson = { seeds: [{ type: "VARIOUS SEED" }] };
const genericResponseJson = { status: "success" };
const testType = "TEST_SEED_TYPE";
const testSeedId = 6;
const testLabel = "seed-test-label";
const testSeeds = [{ type: "test", value: "seed" }];
describe("#censys.asm.seeds", () => {
  const c = new AsmClient({ apiKey: API_KEY });
  const i = c.seeds;
  const scope = nock(i.baseUrl);

  it("get seeds", async () => {
    scope.get("/seeds").reply(200, getSeedJson);
    const res = await i.getSeeds();
    expect(res).toStrictEqual(getSeedJson.seeds);
  });

  it("get seeds by type", async () => {
    const testJson = { seeds: [{ type: testType }] };
    scope.get("/seeds").query({ type: testType }).reply(200, testJson);
    const res = await i.getSeeds(testType);
    expect(res).toStrictEqual(testJson.seeds);
  });

  it("get seeds by id", async () => {
    scope.get(`/seeds/${testSeedId}`).reply(200, getSeedJson);
    const res = await i.getSeedById(testSeedId);
    expect(res).toStrictEqual(getSeedJson);
  });

  it("add seeds", async () => {
    scope.post("/seeds", { seeds: testSeeds }).reply(200, genericResponseJson);
    const res = await i.addSeeds(testSeeds);
    expect(res).toStrictEqual(genericResponseJson);
  });

  it.each([[true], [false]])("add seeds with force", async (force) => {
    scope
      .post("/seeds", { seeds: testSeeds })
      .query({ force })
      .reply(200, genericResponseJson);
    const res = await i.addSeeds(testSeeds, force);
    expect(res).toStrictEqual(genericResponseJson);
  });

  it("replace seeds by label", async () => {
    scope
      .put("/seeds", { seeds: testSeeds })
      .query({ label: testLabel })
      .reply(200, genericResponseJson);
    const res = await i.replaceSeedsByLabel(testLabel, testSeeds);
    expect(res).toStrictEqual(genericResponseJson);
  });

  it.each([[true], [false]])(
    "replace seeds by label with force",
    async (force) => {
      scope
        .put("/seeds", { seeds: testSeeds })
        .query({ label: testLabel, force })
        .reply(200, genericResponseJson);
      const res = await i.replaceSeedsByLabel(testLabel, testSeeds, force);
      expect(res).toStrictEqual(genericResponseJson);
    }
  );

  it("delete seeds by label", async () => {
    scope
      .delete("/seeds")
      .query({ label: testLabel })
      .reply(200, genericResponseJson);
    await i.deleteSeedsByLabel(testLabel);
    scope.done();
  });

  it("delete seeds by id", async () => {
    scope.delete(`/seeds/${testSeedId}`).reply(200, genericResponseJson);
    await i.deleteSeedById(testSeedId);
    scope.done();
  });
});
