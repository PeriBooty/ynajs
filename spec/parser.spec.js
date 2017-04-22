"use strict";

const Yna = require("../index.js");

describe("Parser test", function () {

    it("Empty", function () {
        const tag = new Yna("");

        expect(tag.tree).toEqual([""]);
    });

    it("Text", function () {
        const tag = new Yna("foo");

        expect(tag.tree).toEqual(["foo"]);
    });

    it("Text + Key", function () {
        const tag = new Yna("foo {time} bar");

        expect(tag.tree).toEqual(["foo ", {
            type: "key",
            name: "time"
        }, " bar"]);
    });

    it("Text + Command", function () {
        const tag = new Yna("foo {time:+10;} bar");

        expect(tag.tree).toEqual(["foo ", {
            type: "command",
            name: "time",
            data: ["+10"]
        }, " bar"]);
    });

    it("Text + Command + Key", function () {
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
});
