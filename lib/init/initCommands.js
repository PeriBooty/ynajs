"use strict";

const set = require("../commands/set");
const func = require("../commands/func");

const when = require("../commands/when");

const oneline = require("../commands/oneline");

const upper = require("../commands/upper");
const lower = require("../commands/lower");
const title = require("../commands/title");
const rep = require("../commands/rep");
const parse = require("../commands/parse");
const slice = require("../commands/slice");
const math = require("../commands/math");

const len = require("../commands/len");
const time = require("../commands/time");

const choose = require("../commands/choose");
const wchoose = require("../commands/wchoose");
const num = require("../commands/num");

/**
 * Creates map of default commands
 * @returns {Map}
 */
module.exports = function () {
    const map = new Map();

    /**
     * Key storage
     */
    map.set("set", set);
    map.set("func", func);

    /**
     * Conditional
     */
    map.set("when", when);

    /**
     * Data conversion
     */
    map.set("math", math);
    map.set("time", time);

    /**
     * Blocks
     */
    map.set("oneline", oneline);

    /**
     * String commands
     */
    map.set("len", len);
    map.set("upper", upper);
    map.set("lower", lower);
    map.set("title", title);
    map.set("rep", rep);
    map.set("parse", parse);
    map.set("slice", slice);

    /**
     * Random values
     */
    map.set("num", num);
    map.set("choose", choose);
    map.set("wchoose", wchoose);

    return map;
};
