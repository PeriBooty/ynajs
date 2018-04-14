"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command wchoose test", () => {
    it("Simple", () => {
        const result = new Yna("{wchoose:foo;1;bar;2;}").run();

        expect(["foo", "bar"].includes(result)).toBeTruthy();
    });
    it("No args", () => {
        const result = new Yna("{wchoose;}").run();

        expect(result).toEqual("<wchoose:no options>");
    });
    it("Mismatched weighting", () => {
        const result = new Yna("{wchoose:a;2;b;}").run();

        expect(result).toEqual("<wchoose:mismatched weighting>");
    });
    it("Invalid weights", () => {
        const result = new Yna("{wchoose:a;foo;b;1;}").run();

        expect(result).toEqual("<wchoose:invalid weight>");
    });
});
