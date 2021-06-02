import nock from "nock";
import { ClientV1 } from "../../src";
import { API_ID, API_SECRET, INVALID_DOCUMENT_ID } from "../consts";

const maxRecords = 10;
const viewJson = {
  document: "test_id",
  tags: ["http", "https"],
  ports: [80, 443],
  protocols: ["443/https_www", "80/http", "80/http_www", "443/https"],
};
const searchJson = {
  status: "ok",
  results: [{}],
  metadata: {
    count: 10000,
    query: "*",
    page: 1,
    pages: 1,
  },
};
const reportJson = {
  status: "ok",
  results: [
    { key: "cloudflare", doc_count: 199512 },
    { key: "Apache", doc_count: 150828 },
    { key: "nginx", doc_count: 138877 },
  ],
  metadata: {
    count: 958646,
    backend_time: 172,
    nonnull_count: 813207,
    other_result_count: 323990,
    buckets: 3,
    error_bound: 6519,
    query: "*",
  },
};

describe.each([
  [
    "certificates",
    "fce621c0dc1c666d03d660472f636ce91e66e96460545f0da7eb1a24873e2f70",
  ],
  ["ipv4", "8.8.8.8"],
  ["websites", "google.com"],
])("#censys.v1.client.%s", (index, documentId) => {
  const c = new ClientV1({ apiId: API_ID, apiSecret: API_SECRET });
  const i = c[index];
  const scope = nock(i.baseUrl);

  it("view", async () => {
    const testJson = { ...viewJson, document: documentId };
    scope.get(`/view/${index}/${documentId}`).reply(200, testJson);
    const res = await i.view(documentId);
    expect(res).toStrictEqual(testJson);
  });

  it("view invalid document id", async () => {
    const testJson = {
      status: "error",
      error_type: "unknown",
      error: `The value ${INVALID_DOCUMENT_ID} is not a valid document.`,
    };
    scope.get(`/view/${index}/${INVALID_DOCUMENT_ID}`).reply(404, testJson);
    expect.assertions(1);
    await expect(i.view(INVALID_DOCUMENT_ID)).rejects.toStrictEqual(testJson);
  });

  it("search", async () => {
    const testJson = { ...searchJson, results: [{ document: documentId }] };
    scope.post(`/search/${index}`).reply(200, testJson);
    const results = [];
    for await (const res of i.search("*")) results.push(res);
    expect(results).toStrictEqual(testJson.results);
  });

  it("search max records", async () => {
    const sampleResults = [];
    for (let i = 0; i < maxRecords + 5; i++) {
      sampleResults.push({ document: documentId + i });
    }
    const testJson = { ...searchJson, results: sampleResults };
    scope.post(`/search/${index}`).reply(200, testJson);
    const results = [];
    for await (const res of i.search("*", [], maxRecords, 1)) results.push(res);
    expect(results.length).toBe(maxRecords);
  });

  it("report", async () => {
    scope.post(`/report/${index}`).reply(200, reportJson);
    const res = await i.report("*");
    expect(res).toStrictEqual(reportJson);
  });
});
