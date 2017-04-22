"use strict";

const Yna = require("../index.js");

describe("Parser test", () => {

    it("Empty", () => {
        const tag = new Yna("");

        expect(tag.tree).toEqual([""]);
    });

    it("Text", () => {
        const tag = new Yna("foo");

        expect(tag.tree).toEqual(["foo"]);
    });

    it("Key", () => {
        const tag = new Yna("{time}");

        expect(tag.tree).toEqual([{
            type: "key",
            name: "time"
        }]);
    });

    it("Command", () => {
        const tag = new Yna("{time:+10;}");

        expect(tag.tree).toEqual([{
            type: "command",
            name: "time",
            data: ["+10"]
        }]);
    });

    it("Text + Key", () => {
        const tag = new Yna("foo {time} bar");

        expect(tag.tree).toEqual(["foo ", {
            type: "key",
            name: "time"
        }, " bar"]);
    });

    it("Text + Command", () => {
        const tag = new Yna("foo {time:+10;} bar");

        expect(tag.tree).toEqual(["foo ", {
            type: "command",
            name: "time",
            data: ["+10"]
        }, " bar"]);
    });

    it("Text + Command + Key", () => {
        const tag = new Yna("foo {time:+10;} bar {time}");

        expect(tag.tree).toEqual(["foo ", {
            type: "command",
            name: "time",
            data: ["+10"]
        }, " bar ", {
            type: "key",
            name: "time"
        }]);
    });

    it("Nested Commands", () => {
        const tag = new Yna("{time:+{num;};}");

        expect(tag.tree).toEqual([{
            type: "command",
            name: "time",
            data: [
                ["+", {
                    type: "command",
                    name: "num",
                    data: []
                }]
            ]
        }]);
    });
});
