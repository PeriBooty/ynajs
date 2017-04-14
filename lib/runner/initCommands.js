"use strict";

const set = require("./commands/set");
const func = require("./commands/func");
//const when = require("./commands/when");

const oneline = require("./commands/oneline");
const upper = require("./commands/upper");
const lower = require("./commands/lower");
const title = require("./commands/title");
//const rep = require("./commands/rep");
//const parse = require("./commands/parse");
//const slice = require("./commands/slice");
//const substition = require("./commands/substition");

const len = require("./commands/len");
//const time = require("./commands/time");

const choose = require("./commands/choose");
const wchoose = require("./commands/wchoose");
const num = require("./commands/num");

module.exports = function () {
    const map = new Map();

    map.set("set", set);
    map.set("func", func);
    //map.set("when", when);

    map.set("num", num);
    map.set("choose", choose);
    map.set("wchoose", wchoose);
    map.set("len", len);

    map.set("oneline", oneline);
    map.set("upper", upper);
    map.set("lower", lower);
    map.set("title", title);

    return map;
};
