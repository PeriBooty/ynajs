"use strict";

const fs = require("fs");
const Yna = require("./index");

//Tag setup
const tag_content = fs.readFileSync("./yna/simple.yna", {
    encoding: "utf8"
});

//Data dump
const tag = new Yna(tag_content);
let result;

tag.addCommand("user", () => "DummyUser#1234");
tag.addCommand("member", () => "DummyMember#1234");
tag.addCommand("nameof", () => "DummyName");

result = tag.run(["foo", "bar"], {
    baaa: 1
}, {
    debug: true
});

console.log(result);
