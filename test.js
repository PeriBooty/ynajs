"use strict";

const fs = require("fs");
//const util = require("util");
const Na = require("./index");

//Tag setup
const tag_content = fs.readFileSync("tags/simple.yna", {
    encoding: "utf8"
});
const instance = new Na("simple", tag_content, {
    name: "​NobodyRocks#5051",
    id: "273221196001181697"
});

//Tag execution
const result = instance.run(["foo", "bar"], [{
    name: "​NobodyRocks#5051",
    id: "273221196001181697"
}], {
    caller: {
        name: "Somebody",
        id: "273221196001181697"
    },
    channel: {
        name: "General",
        id: "292982795582701568"
    },
    server: {
        name: "Server",
        id: "292971950651867137"
    },
    time: Date.now(),
    uses: 23,
    newrep: false
});


console.log(result);
