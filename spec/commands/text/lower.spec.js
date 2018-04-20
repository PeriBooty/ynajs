"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command lower test", () => {
    it("Simple", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{lower:${str};}`).run();

        expect(result).toBe(str.toLowerCase());
    });
});
