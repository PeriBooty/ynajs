"use strict";

const {
    objEntries
} = require("lightdash");
const moment = require("moment");
const toDatetime = require("../types/toDatetime");

/**
 * Creates map of default keys
 *
 * @param {Array<string>} args
 * @param {Object} ctx
 * @returns {Map}
 */
module.exports = function (args, ctx) {
    const map = new Map();
    const time = toDatetime(moment(Date.now()).utc());

    //Tag
    map.set("time", time);

    //Args
    map.set("args", args.join(" "));
    map.set("arglen", args.length);
    args.forEach((arg, index) => {
        map.set("arg" + (index + 1), arg);
    });

    //Default flags
    map.set("newrep", false);

    //CTX
    objEntries(ctx)
        .forEach(pair => {
            map.set(pair[0], pair[1]);
        });

    return map;
};
