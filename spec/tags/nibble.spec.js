"use strict";

const Yna = require("../../dist/yna.common");
const fs = require("fs");
const path = require("path");
const script = fs.readFileSync(path.join(__dirname, "./scripts/nibble.yna"), {
    encoding: "UTF8"
});

describe("Tag nibble test", () => {
    it("Simple", () => {
        const result = new Yna(script).run(["Foo", "Bar"]);

        expect(result).toBe("_Bar nibbles on Foo_");
    });
    it("Missing d.js", () => {
        const result = new Yna(script).run(["Foo"]);

        expect(result).toBe(
            "_<caller.display_name:unknown key> nibbles on Foo_"
        );
    });
});
