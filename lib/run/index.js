"use strict";

const initKeys = require("./initKeys");
const initCommands = require("./initCommands");
const exec = require("./exec");

module.exports = function (tag, args, mentions, ctx) {
    const keys = initKeys(tag, args, mentions, ctx);
    const commands = initCommands(tag, args, mentions, ctx);
    const result = exec(tag.tree, keys, commands);

    return result;
};
