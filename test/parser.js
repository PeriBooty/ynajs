"use strict";

/* eslint no-console: "off" */
const fs = require("fs");
const util = require("util");
const Yna = require("../index");

const text = fs.readFileSync("./test/data.yna", "utf8");
const tag = new Yna(text, {
    debug: true,
    plugins: {
        discord: false,
        init: true
    }
});

console.log(util.inspect(tag.tree, {
    depth: null
}));
