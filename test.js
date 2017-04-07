"use strict";

const fs = require("fs");
const util = require("util");
const Na = require("./index");

const tag = fs.readFileSync("tags/simple.yna", {
    encoding: "utf8"
});
const instance = new Na(tag);
const result = instance.run("foo", {
    tag: "tag",
    meid: "meid",
    caller: "caller",
    callerid: "callerid",
    channel: "channel",
    channelid: "channelid",
    server: "server",
    serverid: "serverid",
    time: Date.now(),
    uses: "uses",
    newrep: "false"
});


console.log(result);
