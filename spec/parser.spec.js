"use strict";

const Yna = require("../index.js");
const language = require("../lib/language");

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

        expect(tag.tree).toEqual([language.ids.key, "time"]);
    });

    it("Command", () => {
        const tag = new Yna("{time:+10;}");

        expect(tag.tree).toEqual([language.ids.command, "time", ["+10"]]);
    });

    it("Text + Key", () => {
        const tag = new Yna("foo {time} bar");

        expect(tag.tree).toEqual(["foo ", [language.ids.key, "time"], " bar"]);
    });

    it("Text + Command", () => {
        const tag = new Yna("foo {time:+10;} bar");

        expect(tag.tree).toEqual(["foo ", [language.ids.command, "time", ["+10"]], " bar"]);
    });

    it("Nested Commands", () => {
        const tag = new Yna("{time:+{num;};}");

        expect(tag.tree).toEqual([
            language.ids.command, "time", [
                ["+", [language.ids.command, "num", []]]
            ]
        ]);
    });

    it("Deeply Nested Commands", () => {
        const tag = new Yna("{time:+{num:{num:0;10;};};}");

        expect(tag.tree).toEqual([
            language.ids.command, "time", [
                ["+", [language.ids.command, "num", [
                    [language.ids.command, "num", ["0", "10"]]
                ]]]
            ]
        ]);
    });
});
