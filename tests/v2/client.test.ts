import ClientV2 from "../../src/v2";

describe("#censys.v2.client", () => {
  it("missing apiId and apiSecret", () => {
    expect(() => new ClientV2()).toThrow(
      "No API ID or API Secret configured."
    );
  });
});
