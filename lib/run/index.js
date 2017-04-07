"use strict";

const initMap = require("./initMap");

module.exports = function (tree, args, ctx) {
    const keys = initMap(args,ctx);

    console.log(keys);

    return "Foo";
};
