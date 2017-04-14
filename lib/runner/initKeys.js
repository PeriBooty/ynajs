"use strict";

const toDatetime = require("../util/toDatetime");

module.exports = function (info, args = [], mentions = [], ctx = {}) {
    const map = new Map();
    const time = toDatetime(ctx.time) || Date.now();

    //Args
    map.set("args", args.join(" "));
    map.set("arglen", args.length);
    args.forEach((arg, index) => {
        map.set("arg" + (index + 1), arg);
    });

    //Tag
    map.set("tag", info.name);
    map.set("time", time);

    //CTX


    return map;
};
