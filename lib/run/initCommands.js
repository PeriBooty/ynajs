"use strict";

const num = require("./commands/num");
const choose = require("./commands/choose");
const wchoose = require("./commands/wchoose");
const oneline = require("./commands/oneline");
//const set = require("./commands/set");
const upper = require("./commands/upper");
const lower = require("./commands/lower");
const title = require("./commands/title");

module.exports = function () {
    const map = new Map();

    map.set("oneline", oneline);
    map.set("upper", upper);
    map.set("lower", lower);
    map.set("title", title);

    map.set("num", num);
    map.set("choose", choose);
    map.set("wchoose", wchoose);
    //map.set("set", set);

    return map;
};
