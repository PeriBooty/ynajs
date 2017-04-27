"use strict";

const fs = require("fs");
const Yna = require("./index");

//Tag setup
const tag_content = fs.readFileSync("./yna/simple.yna", {
    encoding: "utf8"
});

//Data dump
const instance = new Yna(tag_content, {
    debug: true
});
const result = instance.run(["foo", "bar"], {
    foo: 1
});

console.log(result);
