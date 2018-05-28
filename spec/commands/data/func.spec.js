"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command func test", () => {
    it("Simple", () => {
        const result = new Yna("{func:a;123;}").run();

        expect(result).toBe("");
    });
    it("Simple 2", () => {
        const result = new Yna("{func:a;123;}{a}").run();

        expect(result).toBe("123");
    });
    it("Simple 3", () => {
        const result = new Yna("{func:a;ab\nc;}{a}").run();

        expect(result).toBe("ab\\\\nc");
    });
    it("No args", () => {
        const result = new Yna("{func;}").run();

        expect(result).toBe("<func:no args>");
    });
    it("Invalid args", () => {
        const result = new Yna("{func:foo;}").run();

        expect(result).toBe("<func:invalid args>");
    });
    it("Invalid key", () => {
        const result = new Yna("{func:%&&%&;abc;}").run();

        expect(result).toBe("<func:invalid key>");
    });
    it("Max depth", () => {
        const result = new Yna("{func:a;{a};}{a}").run();

        expect(result).toBe("<a:max recursion depth exceeded>");
    });
});
