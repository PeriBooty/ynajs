"use strict";

const fs = require("fs");
const Yna = require("./index");

//Tag setup
const tag_content = fs.readFileSync("./yna/simple.yna", {
    encoding: "utf8"
});

//Data dump
const instance = new Yna(tag_content);
const result = instance.run(["foo", "bar"], {
    foo: 1
},{
    debug: true
});

console.log(result);
