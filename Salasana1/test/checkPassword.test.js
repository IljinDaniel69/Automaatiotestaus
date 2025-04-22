import checkPassword from "../checkPassword.js";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("checkPassword", () => {
  it("tulee hyväksyä kelvollinen salasana", () => {
    const result = checkPassword("Valid1!pass");
    assert.strictEqual(result, true);
  });

  it("pitäisi hylätä liian lyhyt salasana", () => {
    const result = checkPassword("A1!short");
    assert.strictEqual(result, false);
  });

  it("tulee hylätä salasana ilman isoja kirjaimia", () => {
    const result = checkPassword("nouppercase1!");
    assert.strictEqual(result, false);
  });

  it("pitäisi hylätä salasana ilman pieniä kirjaimia", () => {
    const result = checkPassword("NOLOWERCASE1!");
    assert.strictEqual(result, false);
  });

  it("pitäisi hylätä salasana ilman numeroita", () => {
    const result = checkPassword("NoNumberHere!");
    assert.strictEqual(result, false);
  });

  it("pitäisi hylätä salasana ilman erikoismerkkejä", () => {
    const result = checkPassword("NoSpecial1s");
    assert.strictEqual(result, false);
  });

  it("pitäisi hylätä salasana, josta puuttuu useita vaatimuksia", () => {
    const result = checkPassword("short");
    assert.strictEqual(result, false);
  });
});
