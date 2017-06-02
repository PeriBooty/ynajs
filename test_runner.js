"use strict";

const fs = require("fs");
const Yna = require("./index");

//Tag setup
const tag_content = fs.readFileSync("./test/_input.yna", {
    encoding: "utf8"
});

//Data dump
const tag = new Yna(tag_content);
let result;

result = tag.run(["100"], {
    foo: 1,
    bar: {
        __default: 1,
        bizz: 12
    }
}, {
    debug: true
});

console.log(result);
