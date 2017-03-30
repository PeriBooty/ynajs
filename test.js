"use strict";

const fs = require("fs");
const util = require("util");
const Na = require("./index");

const tag = fs.readFileSync("tags/pizzamaker.yna", {
    encoding: "utf8"
});
const instance = new Na(tag);
//const result = instance.run("foo");

console.log(util.inspect(instance.tree, {
    showHidden: false,
    depth: null
}));
