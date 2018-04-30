"use strict";

const Yna = require("../../dist/yna.common");

describe("Parser test", () => {
    it("Empty", () => {
        const tag = new Yna("");

        expect(tag.tree).toEqual([]);
    });

    it("Text", () => {
        const tag = new Yna("foo");

        expect(tag.tree).toEqual("foo");
    });

    it("Key", () => {
        const tag = new Yna("{time}");

        expect(tag.tree).toEqual([0, "time"]);
    });

    it("Command", () => {
        const tag = new Yna("{time:+10;}");

        expect(tag.tree).toEqual([1, "time", ["+10"]]);
    });

    it("Text + Key", () => {
        const tag = new Yna("foo {time} bar");

        expect(tag.tree).toEqual(["foo ", [0, "time"], " bar"]);
    });

    it("Text + Command", () => {
        const tag = new Yna("foo {time:+10;} bar");

        expect(tag.tree).toEqual(["foo ", [1, "time", ["+10"]], " bar"]);
    });

    it("Nested Commands", () => {
        const tag = new Yna("{time:+{num;};}");

        expect(tag.tree).toEqual([1, "time", [
            ["+", [1, "num", []]]
        ]]);
    });

    it("Deeply Nested Commands", () => {
        const tag = new Yna("{time:+{num:{num:0;10;};};}");

        expect(tag.tree).toEqual([
            1,
            "time", [
                ["+", [1, "num", [
                    [1, "num", ["0", "10"]]
                ]]]
            ]
        ]);
    });
});
