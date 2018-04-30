"use strict";

const Yna = require("../../dist/yna.common");
const fs = require("fs");
const path = require("path");
const script = fs.readFileSync(path.join(__dirname, "./scripts/ship.yna"), {
    encoding: "UTF8"
});

describe("Tag ship test", () => {
    it("Simple", () => {
        const result = new Yna(script).run(["Foo", "Bar"]);

        expect(result).toMatch(
            /^=====Shipping Score=====\nFirst: .+\nSecond: .+\n====================\n.+\n$/
        );
    });
});
