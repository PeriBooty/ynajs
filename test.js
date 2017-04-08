"use strict";

const fs = require("fs");
//const util = require("util");
const Na = require("./index");

//Tag setup
const tag_content = fs.readFileSync("tags/simple.yna", {
    encoding: "utf8"
});
const tag_creator = {
    name: "​NobodyRocks#5051",
    id: "273221196001181697"
};
const instance = new Na(tag_content, tag_creator);

//Tag execution
const run_args = ["foo", "bar"];
const run_mentions = ["​NobodyRocks#5051"];
const run_caller = {
    name: "Somebody",
    id: "273221196001181697"
};
const run_channel = {
    name: "General",
    id: "292982795582701568"
};
const run_server = {
    name: "Server",
    id: "292971950651867137"
};

const result = instance.run(run_args, run_mentions, {
    tag: "simple",
    meid: tag_creator.id,
    caller: run_caller,
    channel: run_channel,
    server: run_server,
    time: Date.now(),
    uses: 23,
    newrep: false
});


console.log(result);
