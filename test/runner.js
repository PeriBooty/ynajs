"use strict";

/* eslint no-console: "off" */
const fs = require("fs");
const Yna = require("../index");

const text = fs.readFileSync("./test/data.yna", "utf8");
const tag = new Yna(text);
const result = tag.run(["bar"], {
    callerid: "23123"
}, {
    debug: true,
}, {});

console.log(result);
