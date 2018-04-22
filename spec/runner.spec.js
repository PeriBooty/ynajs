"use strict";

const Yna = require("../dist/yna.common");

describe("Runner test", () => {
    it("Empty", () => {
        const tag = new Yna("");
        const result = tag.run();

        expect(result).toEqual("");
    });

    it("Text", () => {
        const tag = new Yna("foo");
        const result = tag.run();

        expect(result).toEqual("foo");
    });

    it("Key", () => {
        const tag = new Yna("{arg1}");
        const result = tag.run(["foo"]);

        expect(result).toEqual("foo");
    });

    it("Command", () => {
        const tag = new Yna("{lower:FOO;}");
        const result = tag.run();

        expect(result).toEqual("foo");
    });

    it("Text + Key", () => {
        const tag = new Yna("foo {arg1} bar");
        const result = tag.run(["foo"]);

        expect(result).toEqual("foo foo bar");
    });

    it("Text + Command", () => {
        const tag = new Yna("foo {lower:FOO;} bar");
        const result = tag.run();

        expect(result).toEqual("foo foo bar");
    });

    it("Text + Command + Key", () => {
        const tag = new Yna("foo {lower:BAR;} bar {arg1}");
        const result = tag.run(["foo"]);

        expect(result).toEqual("foo bar bar foo");
    });

    it("Nested Commands", () => {
        const tag = new Yna("{title:{lower:BAR;};}");
        const result = tag.run();

        expect(result).toEqual("Bar");
    });
});
