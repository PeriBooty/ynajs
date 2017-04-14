"use strict";

const toDatetime = require("../util/toDatetime");

module.exports = function (info, args = [], ctx = {}) {
    const map = new Map();
    const time = toDatetime(Date.now());

    //Tag
    map.set("tag", info.name);
    map.set("time", time);

    //Args
    map.set("args", args.join(" "));
    map.set("arglen", args.length);
    args.forEach((arg, index) => {
        map.set("arg" + (index + 1), arg);
    });

    //CTX
    Object.entries(ctx).forEach(pair => {
        map.set(pair[0], pair[1]);
    });


    return map;
};
