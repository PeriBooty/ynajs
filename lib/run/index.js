"use strict";

const initKeys = require("./initKeys");
const initCommands = require("./initCommands");
const exec = require("./exec");

module.exports = function (tag, args, mentions, ctx) {
    const keys = initKeys(tag, args, mentions, ctx);
    const commands = initCommands(tag, args, mentions, ctx);
    let result;

    try {
        result = exec(tag.tree, keys, commands);
    } catch (err) {
        result = err.toString();
    }

    return result;
};
