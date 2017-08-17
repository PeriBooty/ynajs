"use strict";

/**
 * Core
 */
const set = require("../commands/core/set");
const func = require("../commands/core/func");

const when = require("../commands/core/when");

const oneline = require("../commands/core/oneline");

const upper = require("../commands/core/upper");
const lower = require("../commands/core/lower");
const title = require("../commands/core/title");
const rep = require("../commands/core/rep");
const parse = require("../commands/core/parse");
const slice = require("../commands/core/slice");
const math = require("../commands/core/math");

const len = require("../commands/core/len");
const time = require("../commands/core/time");

const choose = require("../commands/core/choose");
const wchoose = require("../commands/core/wchoose");
const num = require("../commands/core/num");

/**
 * Discord
 */

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
