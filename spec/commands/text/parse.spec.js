"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command parse test", () => {
    it("Simple", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{parse:${str};}`).run();

        expect(result).toBe(encodeURI(str));
    });
});
