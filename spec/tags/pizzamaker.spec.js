"use strict";

const Yna = require("../../dist/yna.common");
const fs = require("fs");
const path = require("path");
const script = fs.readFileSync(
    path.join(__dirname, "./scripts/pizzamaker.yna"), {
        encoding: "UTF8"
    }
);

describe("Tag pizzamaker test", () => {
    it("Simple", () => {
        const result = new Yna(script).run([]);

        expect(result).toMatch(/^We should make a pizza with .+ And .+!\n$/);
    });
});
