"use strict";

/* eslint no-console: "off" */
const fs = require("fs");
const Yna = require("../index");

const text = fs.readFileSync("./test/data.yna", "utf8");
const tag = new Yna(text, {
    debug: true,
    plugins: {
        discord: false,
        init: true
    }
});
const result = tag.run([], {
    a: 1,
    b: {
        __default: 1,
        c: 12
    }
}, {
    debug: true,
});

console.log(result);
