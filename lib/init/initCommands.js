"use strict";

/**
 * Core
 */
const set = require("../commands/data/set");
const func = require("../commands/data/func");
const time = require("../commands/data/time");

const when = require("../commands/logic/when");

const oneline = require("../commands/block/oneline");
const _void = require("../commands/block/void");

const upper = require("../commands/text/upper");
const lower = require("../commands/text/lower");
const title = require("../commands/text/title");
const rep = require("../commands/text/rep");
const parse = require("../commands/text/parse");
const slice = require("../commands/text/slice");
const len = require("../commands/text/len");

const math = require("../commands/numbers/math");

const choose = require("../commands/random/choose");
const wchoose = require("../commands/random/wchoose");
const num = require("../commands/random/num");

/**
 * Creates map of default commands
 *
 * @returns {Map}
 */
module.exports = function () {
    const map = new Map();

    /**
     * Data
     */
    map.set("set", set);
    map.set("func", func);
    map.set("time", time);

    /**
     * Logic
     */
    map.set("when", when);

    /**
     * Block
     */
    map.set("oneline", oneline);
    map.set("void", _void);

    /**
     * Numbers
     */
    map.set("math", math);

    /**
     * Text
     */
    map.set("len", len);
    map.set("upper", upper);
    map.set("lower", lower);
    map.set("title", title);
    map.set("rep", rep);
    map.set("parse", parse);
    map.set("slice", slice);

    /**
     * Random
     */
    map.set("num", num);
    map.set("choose", choose);
    map.set("wchoose", wchoose);

    return map;
};
