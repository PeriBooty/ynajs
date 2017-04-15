"use strict";

const Runner = require("./runner");
const initCommands = require("./initCommands");
const initKeys = require("./initKeys");

/**
 * Executes runner on tree
 * @param {Object} tree
 * @param {Object} info
 * @param {Object} options
 * @param {Array} args
 * @param {Object} ctx
 * @returns {String}
 */
module.exports = function (tree, info, options, args = [], ctx = {}) {
    const commands = initCommands();
    const keys = initKeys(info, args, ctx);
    const runner = new Runner(commands, keys, options.runner);

    return runner.execArr(tree).join("");
};
