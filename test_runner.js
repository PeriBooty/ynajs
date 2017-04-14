"use strict";

const fs = require("fs");
//const util = require("util");
const Yna = require("./index");

//Tag setup
const tag_content = fs.readFileSync("yna/simple.yna", {
    encoding: "utf8"
});

//Data dump
const instance = new Yna(tag_content,
    {
        name: "simple_tag",
        creator: {
            name: "foo",
            id: "23141414124"
        }
    }, {
        runner: {
            debug: true
        }
    }
);
const result = instance.run(["foo", "bar"], {
    callerid: "213124124"
});

console.log(result);
