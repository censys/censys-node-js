import nock from "nock";
import { ClientV1 } from "../../src";
import { API_ID, API_SECRET } from "../consts";

const seriesJson = {
  primary_series: [],
  raw_series: [],
};
const viewJson = {
  description:
    "The Censys IPv4 dataset provides data about the services (e.g., HTTP, SMTP, MySQL) running on all publicly-accessible IPv4 hosts.",
  results: { historical: [] },
};
const resultJson = { files: { filename: { file_type: "data" } } };
const testSeries = "ipv4_2018";
const testResult = "20200818";

describe("#censys.v1.data", () => {
  const c = new ClientV1({ apiId: API_ID, apiSecret: API_SECRET });
  const i = c.data;
  const scope = nock(i.baseUrl);

  it("get series", async () => {
    scope.get("/data").reply(200, seriesJson);
    const res = await i.getSeries();
    expect(res).toStrictEqual(seriesJson);
  });

  it("view series", async () => {
    scope.get(`/data/${testSeries}`).reply(200, viewJson);
    const res = await i.viewSeries(testSeries);
    expect(res).toStrictEqual(viewJson);
  });

  it("view result", async () => {
    scope.get(`/data/${testSeries}/${testResult}`).reply(200, resultJson);
    const res = await i.viewResult(testSeries, testResult);
    expect(res).toStrictEqual(resultJson);
  });
});
