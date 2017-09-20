"use strict";



/**
 * Core
 */
const set = require("../commands/data/set");
const func = require("../commands/data/func");
const time = require("../commands/data/time");

const when = require("../commands/logic/when");

const oneline = require("../commands/text/oneline");
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
 * Discord
 */
//const init = require("../commands/discord/init");
//const save = require("../commands/discord/save");

const nameof = require("../commands/plugins/discord/nameof");
const member = require("../commands/plugins/discord/member");
const user = require("../commands/plugins/discord/user");

const {
    merge
} = require("lodash");

const optionsCommandsDefault = function () {
    return {
        plugins: {
            discord: true
        },
    };
};

/**
 * Creates map of default commands
 * @returns {Map}
 */
module.exports = function (options) {
    const optionsMerged = merge(optionsCommandsDefault(), options);
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
     * Numbers
     */
    map.set("math", math);

    /**
     * Text
     */
    map.set("oneline", oneline);
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

    /**
     * Plugins
     */
    if (optionsMerged.plugins.discord) {
        //map.set("init", init);
        //map.set("save", save);

        map.set("nameof", nameof);
        map.set("member", member);
        map.set("user", user);
    }

    return map;
};
