"use strict";

const Yna = require("../../../dist/yna.common");

describe("Comnmand num test", () => {
    it("Simple", () => {
        const result = new Yna("{num:0;100;}").run();

        expect(result <= 100 && result >= result >= 0).toBeTruthy();
    });
    it("Simple", () => {
        const result = new Yna("{num:0;100;}").run();

        expect(result <= 100 && result >= result >= 0).toBeTruthy();
    });
});
