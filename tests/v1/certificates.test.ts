import nock from "nock";
import { ClientV1 } from "../../src";
import { API_ID, API_SECRET } from "../consts";

const bulkJson = {
  fce621c0dc1c666d03d660472f636ce91e66e96460545f0da7eb1a24873e2f70:
    "MISC_CERT_DATA",
  a762bf68f167f6fbdf2ab00fdefeb8b96f91335ad6b483b482dfd42c179be076:
    "MISC_CERT_DATA",
};

describe("#censys.v1.certificate", () => {
  const c = new ClientV1({ apiId: API_ID, apiSecret: API_SECRET });
  const i = c.certificates;
  const scope = nock(i.baseUrl);

  it("view series", async () => {
    scope.post("/bulk/certificates").reply(200, bulkJson);
    const res = await i.bulk([
      "fce621c0dc1c666d03d660472f636ce91e66e96460545f0da7eb1a24873e2f70",
      "a762bf68f167f6fbdf2ab00fdefeb8b96f91335ad6b483b482dfd42c179be076",
    ]);
    expect(res).toStrictEqual(bulkJson);
  });
});
