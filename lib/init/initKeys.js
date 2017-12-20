"use strict";

const { forEachEntry } = require("lightdash");
const moment = require("moment");
const toDatetime = require("../types/toDatetime");

/**
 * Creates map of default keys
 *
 * @param {Array<string>} args
 * @param {Object} ctx
 * @returns {Map}
 */
module.exports = (args, ctx) => {
    const map = new Map();
    const time = toDatetime(moment(Date.now()).utc());

    map.set("time", time);
    map.set("newrep", false);

    // Args
    map.set("args", args.join(" "));
    map.set("arglen", args.length);
    args.forEach((arg, index) => {
        map.set(`arg${index + 1}`, arg);
    });

    // Context
    forEachEntry(ctx, (val, key) => {
        map.set(key, val);
    });

    return map;
};
