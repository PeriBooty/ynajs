"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command set test", () => {
    it("Simple", () => {
        const result = new Yna("{set:a;123;}").run();

        expect(result).toBe("");
    });
    it("Simple 2", () => {
        const result = new Yna("{set:a;123;}{a}").run();

        expect(result).toBe("123");
    });
    it("Simple 3", () => {
        const result = new Yna("{set:a;ab\nc;}{a}").run();

        expect(result).toBe("ab\\\\nc");
    });
    it("No args", () => {
        const result = new Yna("{set;}").run();

        expect(result).toBe("<set:no args>");
    });
    it("Invalid args", () => {
        const result = new Yna("{set:1;2;3;}").run();

        expect(result).toBe("<set:invalid args>");
    });
    it("Invalid key", () => {
        const result = new Yna("{set:%&&%&;abc;}").run();

        expect(result).toBe("<set:invalid key>");
    });
});
