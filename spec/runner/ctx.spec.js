"use strict";

const Yna = require("../../dist/yna.common");

describe("ctx test", () => {
    it("Simple", () => {
        const result = new Yna("{foo}").run([], {
            foo: 1
        });

        expect(result).toEqual("1");
    });
    it("Nested", () => {
        const result = new Yna("{foo.bar}").run([], {
            foo: {
                bar: 1
            }
        });

        expect(result).toEqual("1");
    });
    it("Default", () => {
        const result = new Yna("{foo}").run([], {
            foo: {
                __default: 1
            }
        });

        expect(result).toEqual("1");
    });
    it("Missing", () => {
        const result = new Yna("{foo}").run([], {
            bar: 1
        });

        expect(result).toEqual("<foo:unknown key>");
    });
});
