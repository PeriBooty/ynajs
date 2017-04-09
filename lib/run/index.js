"use strict";

const initKeys = require("./initKeys");
const initCommands = require("./initCommands");
const recurseExec = require("./recurseExec");

module.exports = function (tag, args, mentions, ctx) {
    const keys = initKeys(tag, args, mentions, ctx);
    const commands = initCommands(tag, args, mentions, ctx);
    const result = recurseExec(tag.tree, keys, commands);

    console.log({
        keys,
        commands,
        result
    });

    return result;
};
