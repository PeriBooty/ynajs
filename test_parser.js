"use strict";

const fs = require("fs");
const util = require("util");
const Yna = require("./index");

//Tag setup
const tag_content = fs.readFileSync("yna/simple.yna", {
    encoding: "utf8"
});
const tag = new Yna(tag_content, {},
    {
        parser: {
            debug: true
        }
    }
);

console.log(util.inspect(tag.tree, { depth: null }));
