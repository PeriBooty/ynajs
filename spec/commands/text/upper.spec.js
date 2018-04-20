"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command upper test", () => {
    it("Simple", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{upper:${str};}`).run();

        expect(result).toBe(str.toUpperCase());
    });
});
