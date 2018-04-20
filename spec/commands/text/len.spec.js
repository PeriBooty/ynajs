"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command len test", () => {
    it("Simple", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{len:${str};}`).run();

        expect(result).toBe(String(str.length));
    });
});
