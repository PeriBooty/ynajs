"use strict";

const { mapFromObject } = require("lightdash");

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
module.exports = () => {
    const map = mapFromObject({
        /**
         * Data
         */
        set,
        func,
        time,

        /**
         * Logic
         */
        when,

        /**
         * Numbers
         */
        math,

        /**
         * Text
         */
        len,
        upper,
        lower,
        title,
        rep,
        parse,
        slice,

        /**
         * Random
         */
        num,
        choose,
        wchoose,

        /**
         * Wrappers
         */
        oneline,
        void: _void
    });

    // Conditional registers here

    return map;
};
