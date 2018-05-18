"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command title test", () => {
    it("Simple", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{title:${str};}`).run();

        expect(result).toBe("Lorem Ipsum Et Dolor Sit Amet");
    });
});
