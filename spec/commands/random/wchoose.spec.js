"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command wchoose test", () => {
    it("Simple", () => {
        const result = new Yna("{wchoose:foo;1;bar;2;}").run();

        expect(["foo", "bar"].includes(result)).toBeTruthy();
    });
    it("No args", () => {
        const result = new Yna("{wchoose;}").run();

        expect(result).toBe("<wchoose:no options>");
    });
    it("Mismatched weighting", () => {
        const result = new Yna("{wchoose:a;2;b;}").run();

        expect(result).toBe("<wchoose:mismatched weighting>");
    });
    it("Invalid weights", () => {
        const result = new Yna("{wchoose:a;foo;b;1;}").run();

        expect(result).toBe("<wchoose:invalid weight>");
    });
});
