"use strict";

/* eslint no-console: "off" */
const fs = require("fs");
const Yna = require("../index");

const text = fs.readFileSync("./test/data.yna", "utf8");
const tag = new Yna(text, {
    debug: true,
    plugins: {
        discord: true
    }
});
const result = tag.run(["Foo", "Bar"], {
    a: 1,
    b: {
        __default: 1,
        c: 12
    }
}, {
    debug: false,
});

console.log(result);
