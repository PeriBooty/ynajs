"use strict";

const fs = require("fs");
const util = require("util");
const Yna = require("../index");

const tag_content = fs.readFileSync("../yna/simple.yna", {
    encoding: "utf8"
});
const tag = new Yna(tag_content, {},
    {
        parser: {
            debug: true
        }
    }
);

console.log(JSON.stringify(tag.tree));
