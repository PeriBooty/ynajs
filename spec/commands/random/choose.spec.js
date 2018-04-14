"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command choose test", () => {
    it("Simple", () => {
        const result = new Yna("{choose:foo;bar;}").run();

        expect(["foo", "bar"].includes(result)).toBeTruthy();
    });
    it("No args", () => {
        const result = new Yna("{choose;}").run();

        expect(result).toEqual("<choose:no options>");
    });
});
