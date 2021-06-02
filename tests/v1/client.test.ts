import ClientV1 from "../../src/v1";

describe("#censys.v1.client", () => {
  it("missing apiId and apiSecret", () => {
    expect(() => new ClientV1()).toThrow(
      "No API ID or API Secret configured."
    );
  });
});
