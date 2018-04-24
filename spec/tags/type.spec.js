"use strict";

const Yna = require("../../dist/yna.common");
const fs = require("fs");
const path = require("path");
const script = fs.readFileSync(path.join(__dirname, "./scripts/type.yna"), {
    encoding: "UTF8"
});

describe("Tag type test", () => {
    it("Type 1", () => {
        const result = new Yna(script).run([""]);

        expect(result).toBe(
            [
                " is:",
                "Word: true",
                "Letter: false",
                "Number: false",
                "Decimal: false",
                "Error: false",
                ""
            ].join("\n")
        );
    });
    it("Type 2", () => {
        const result = new Yna(script).run([" "]);

        expect(result).toBe(
            [
                "  is:",
                "Word: false",
                "Letter: true",
                "Number: false",
                "Decimal: false",
                "Error: false",
                ""
            ].join("\n")
        );
    });
    it("Type 3", () => {
        const result = new Yna(script).run(["Foo"]);

        expect(result).toBe(
            [
                "Foo is:",
                "Word: true",
                "Letter: false",
                "Number: false",
                "Decimal: false",
                "Error: false",
                ""
            ].join("\n")
        );
    });
    it("Type 4", () => {
        const result = new Yna(script).run(["Foo Bar"]);

        expect(result).toBe(
            [
                "Foo Bar is:",
                "Word: false",
                "Letter: false",
                "Number: false",
                "Decimal: false",
                "Error: false",
                ""
            ].join("\n")
        );
    });
    it("Type 5", () => {
        const result = new Yna(script).run(["F"]);

        expect(result).toBe(
            [
                "F is:",
                "Word: true",
                "Letter: true",
                "Number: false",
                "Decimal: false",
                "Error: false",
                ""
            ].join("\n")
        );
    });
    it("Type 6", () => {
        const result = new Yna(script).run(["1"]);

        expect(result).toBe(
            [
                "1 is:",
                "Word: true",
                "Letter: true",
                "Number: true",
                "Decimal: true",
                "Error: false",
                ""
            ].join("\n")
        );
    });
    it("Type 7", () => {
        const result = new Yna(script).run(["1.1"]);

        expect(result).toBe(
            [
                "1.1 is:",
                "Word: true",
                "Letter: false",
                "Number: false",
                "Decimal: true",
                "Error: false",
                ""
            ].join("\n")
        );
    });
    it("Type 8", () => {
        const result = new Yna(script).run(["-1"]);

        expect(result).toBe(
            [
                "-1 is:",
                "Word: true",
                "Letter: false",
                "Number: true",
                "Decimal: true",
                "Error: false",
                ""
            ].join("\n")
        );
    });
    it("Type 9", () => {
        const result = new Yna(script).run(["-1.1"]);

        expect(result).toBe(
            [
                "-1.1 is:",
                "Word: true",
                "Letter: false",
                "Number: false",
                "Decimal: true",
                "Error: false",
                ""
            ].join("\n")
        );
    });
    it("Type 10", () => {
        const result = new Yna(script).run(["<a:a b c>"]);

        expect(result).toBe(
            [
                "<a:a b c> is:",
                "Word: false",
                "Letter: false",
                "Number: false",
                "Decimal: false",
                "Error: true",
                ""
            ].join("\n")
        );
    });
});
