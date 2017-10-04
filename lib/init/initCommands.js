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
 * Init
 */
const init = require("../commands/plugins/init/init");

/**
 * Discord
 */
const save = require("../commands/plugins/discord/save");
const nameof = require("../commands/plugins/discord/nameof");
const member = require("../commands/plugins/discord/member");
const user = require("../commands/plugins/discord/user");

const {
    defaultsDeep
} = require("lodash");

const optionsCommandsDefault = {
    plugins: {
        init: true,
        discord: false
    }
};

/**
 * Creates map of default commands
 *
 * @returns {Map}
 */
module.exports = function (options) {
    const optionsMerged = defaultsDeep(options, optionsCommandsDefault);
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
    if (optionsMerged.plugins.init) {
        map.set("init", init);
    }

    if (optionsMerged.plugins.discord) {
        map.set("save", save);

        map.set("nameof", nameof);
        map.set("member", member);
        map.set("user", user);
    }

    return map;
};
