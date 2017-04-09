"use strict";

const number = require("./commands/number");

module.exports = function () {
    const map = new Map();

    map.set("number", number);

    return map;
};
