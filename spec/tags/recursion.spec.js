"use strict";

const Yna = require("../../dist/yna.common");
const fs = require("fs");
const path = require("path");
const script = fs.readFileSync(path.join(__dirname, "./scripts/recursion.yna"), {
    encoding: "UTF8"
});

describe("Tag recursion test", () => {
    it("Simple", () => {
        const result = new Yna(script).run(["foo"]);

        expect(result).toBe("1: foo\n\n");
    });
    it("Simple 2", () => {
        const result = new Yna(script).run(["foo", "bar"]);

        expect(result).toBe("1: foo\n2: bar\n");
    });
    it("Simple 3", () => {
        const result = new Yna(script).run(new Array(100).fill("abc"));

        expect(result).toBe("Too many items\n");
    });
});
