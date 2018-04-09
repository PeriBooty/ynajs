"use strict";

/* eslint no-console: "off" */

const fs = require("fs");
const Yna = require("../dist/yna.common");

const text = fs.readFileSync("./test/data.yna", "utf8");

const tag = new Yna(text);
const result = tag.run(
    ["<a:b"], {}, {
        debug: true
    }
);

console.log(result);
