"use strict";

const fs = require("fs");
const util = require("util");
const Yna = require("./index");

const tag_content = fs.readFileSync("./yna/_input.yna", {
    encoding: "utf8"
});
const tag = new Yna(tag_content, {
    debug: true,
});

console.log(util.inspect(tag.tree, {
    depth: null
}));
//console.log(JSON.stringify(tag.tree))
fs.writeFile("tag.json",JSON.stringify(tag.tree));
