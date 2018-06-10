"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command rep test", () => {
    it("Simple", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{rep:e;${str};X;}`).run();

        expect(result).toBe(str.replace(/e/g, "X"));
    });
    it("Escapes regex chars outside of regex mode", () => {
        const str = "Lorem ipsum eT? dolor SIT amet?";
        const result = new Yna(`{rep:?;${str};X;}`).run();

        expect(result).toBe(str.replace(/\?/g, "X"));
    });
    it("Regex", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{rep:/\\s/;${str};X;}`).run();

        expect(result).toBe(str.replace(/\s/, "X"));
    });
    it("Regex returns empty regex if invalid regex is given", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{rep:/?/;${str};X;}`).run();

        expect(result).toBe(str);
    });
});
