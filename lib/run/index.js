"use strict";

const initMap = require("./initMap");

module.exports = function (tree, creator, args, mentions, ctx) {
    const keys = initMap(creator, args, mentions, ctx);

    console.log(keys);

    return "Foo";
};
