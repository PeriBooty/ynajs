"use strict";

const util = require("util");
const Yna = require("./index");
const tag_data = require("./test_data");

const tag = new Yna(tag_data, {
    debug: true,
});

console.log(util.inspect(tag.tree, {
    depth: null
}));
//console.log(JSON.stringify(tag.tree))
//fs.writeFile("tag.json",JSON.stringify(tag.tree));
