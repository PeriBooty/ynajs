"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command rep test", () => {
    it("Simple", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{rep:e;${str};X;}`).run();

        expect(result).toBe(str.replace(/e/g, "X"));
    });
});
