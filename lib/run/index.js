"use strict";

const initMap = require("./initMap");

module.exports = function (tag, args, mentions, ctx) {
    const keys = initMap(tag, args, mentions, ctx);

    console.log(keys);

    return "Foo";
};
