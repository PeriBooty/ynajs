"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command when test", () => {
    it("Simple comp", () => {
        const result = new Yna("{when:1;eq;1;true;false;}").run();

        expect(result).toEqual("true");
    });
    it("Simple comp 2", () => {
        const result = new Yna("{when:1;eq;5;true;false;}").run();

        expect(result).toEqual("false");
    });
    it("Simple comp 3", () => {
        const result = new Yna("{when:-9999;lt;19;true;false;}").run();

        expect(result).toEqual("true");
    });
    it("Simple in", () => {
        const result = new Yna("{when:o;in;foo;true;false;}").run();

        expect(result).toEqual("true");
    });
    it("Simple in 2", () => {
        const result = new Yna("{when:c;in;a,b,c,d,e;true;false;}").run();

        expect(result).toEqual("true");
    });
    it("Simple in 3", () => {
        const result = new Yna("{when:x;in;a,b,c,d,e;true;false;}").run();

        expect(result).toEqual("false");
    });
    it("Simple is word", () => {
        const result = new Yna("{when:abc;is;word;true;false;}").run();

        expect(result).toEqual("true");
    });
    it("Simple is word 2", () => {
        const result = new Yna("{when:a b;is;word;true;false;}").run();

        expect(result).toEqual("false");
    });
    it("Simple is letter", () => {
        const result = new Yna("{when:a;is;letter;true;false;}").run();

        expect(result).toEqual("true");
    });
    it("Simple is letter 2", () => {
        const result = new Yna("{when:;is;letter;true;false;}").run();

        expect(result).toEqual("false");
    });
    it("Simple is number", () => {
        const result = new Yna("{when:1;is;number;true;false;}").run();

        expect(result).toEqual("true");
    });
    it("Simple is number 2", () => {
        const result = new Yna("{when:a;is;number;true;false;}").run();

        expect(result).toEqual("false");
    });
    it("Simple is decimal", () => {
        const result = new Yna("{when:1.0;is;decimal;true;false;}").run();

        expect(result).toEqual("true");
    });
    it("Simple is decimal 2", () => {
        const result = new Yna("{when:1;is;decimal;true;false;}").run();

        expect(result).toEqual("false");
    });
    it("Simple is error", () => {
        const result = new Yna("{when:<a:abcd>;is;error;true;false;}").run();

        expect(result).toEqual("true");
    });
    it("Simple is error 2", () => {
        const result = new Yna("{when:1;is;error;true;false;}").run();

        expect(result).toEqual("false");
    });
    it("Alias", () => {
        const result = new Yna("{when:-9999;<;19;true;false;}").run();

        expect(result).toEqual("true");
    });
    it("Invalid args", () => {
        const result = new Yna("{when:1;}").run();

        expect(result).toEqual("<when:invalid args>");
    });
    it("Invalid args 2", () => {
        const result = new Yna("{when:1;2;3;4;5;6;7;}").run();

        expect(result).toEqual("<when:invalid args>");
    });
    it("Invalid op", () => {
        const result = new Yna("{when:1;FOOOOO;2;1;}").run();

        expect(result).toEqual("<when:invalid op>");
    });
    it("Args must be numbers", () => {
        const result = new Yna("{when:1;gt;abcde;1;2;}").run();

        expect(result).toEqual("<when:args must be numbers>");
    });
    it("Invalid type name", () => {
        const result = new Yna("{when:1;is;foo;2;}").run();

        expect(result).toEqual("<when:invalid type name>");
    });
});
