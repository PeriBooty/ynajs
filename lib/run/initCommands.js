"use strict";

const num = require("./commands/num");
const choose = require("./commands/choose");
const wchoose = require("./commands/wchoose");
const oneline = require("./commands/oneline");
//const set = require("./commands/set");

module.exports = function () {
    const map = new Map();

    map.set("num", num);
    map.set("choose", choose);
    map.set("wchoose", wchoose);
    map.set("oneline", oneline);
    //map.set("set", set);

    return map;
};
