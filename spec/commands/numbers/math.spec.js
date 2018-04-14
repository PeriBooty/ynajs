"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command choose test", () => {
    it("Add", () => {
        const result = Number(new Yna("{math:add;1;2;}").run());

        expect(result).toBe(3);
    });
    it("Add Float", () => {
        const result = Number(new Yna("{math:add;1.02;2.6;}").run());

        expect(result).toBe(3.62);
    });
    it("Add Multi", () => {
        const result = Number(new Yna("{math:add;1;2;10;100;}").run());

        expect(result).toBe(113);
    });
    it("Sub", () => {
        const result = Number(new Yna("{math:sub;1;2;}").run());

        expect(result).toBe(-1);
    });
    it("Sub Float", () => {
        const result = Number(new Yna("{math:sub;1.02;2.6;}").run());

        expect(result).toBe(-1.58);
    });
    it("Alias", () => {
        const result = Number(new Yna("{math:+;1;2;}").run());

        expect(result).toBe(3);
    });
    it("No args", () => {
        const result = new Yna("{math;}").run();

        expect(result).toEqual("<math:no args>");
    });
    it("Unknown operation", () => {
        const result = new Yna("{math:foobar;1;2;}").run();

        expect(result).toEqual("<math:unknown operation>");
    });
    it("Invalid args", () => {
        const result = new Yna("{math:add;1;}").run();

        expect(result).toEqual("<math:invalid args>");
    });
    it("Invalid args 2", () => {
        const result = new Yna("{math:sub;1;2;1;}").run();

        expect(result).toEqual("<math:invalid args>");
    });
    it("Non-number args", () => {
        const result = new Yna("{math:add;1;foo;}").run();

        expect(result).toEqual("<math:non-number args>");
    });
});
