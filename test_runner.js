"use strict";

const fs = require("fs");
const Yna = require("./index");

//Tag setup
const tag_content = fs.readFileSync("./yna/simple.yna", {
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
    foo: {bar:()=>Math.random()}
});

console.log(result);
