"use strict";

const Yna = require("../../../dist/yna.common");

describe("Command oneline test", () => {
    it("Simple", () => {
        const result = new Yna(`{oneline:a
            b
            c;}`).run();

        expect(result).toBe("abc");
    });
    it("Simple Indent", () => {
        const result = new Yna(`{oneline:a
                b
     c;}`).run();

        expect(result).toBe("abc");
    });
    it("Force Newline", () => {
        const result = new Yna(`{oneline:a\\nb;}`).run();

        expect(result).toBe("a\nb");
    });
    it("Force Newline 2", () => {
        const result = new Yna(`{oneline:a
    b \
    c;}`).run();

        expect(result).toBe("ab     c");
    });
});
