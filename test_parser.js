"use strict";

const fs = require("fs");
const util = require("util");
const Na = require("./index");

//Tag setup
const tag_content = fs.readFileSync("tags/simple.yna", {
    encoding: "utf8"
});
const instance = new Na("simple", tag_content, {
    name: "​NobodyRocks#5051",
    id: "273221196001181697"
});

console.log(JSON.stringify(instance.tree," "," "));
