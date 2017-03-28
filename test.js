"use strict";

const fs = require("fs");
const Na = require("./index");

const tag = fs.readFileSync("tags/simple.yna",{encoding:"utf8"});
const instance = new Na(tag);
//const result = instance.run("foo");

//console.log(instance);
