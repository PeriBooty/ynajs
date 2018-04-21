"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command void test", () => {
    it("Simple", () => {
        const result = new Yna("{void:213123213213;}").run();

        expect(result).toBe("");
    });
});
