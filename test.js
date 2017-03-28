"use strict";

const fs = require("fs");
const na = require("./index");

const tag = fs.readFileSync("tags/pizzamaker.yna");

const result = na.parse(tag);

console.log(result);
