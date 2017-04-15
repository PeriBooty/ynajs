"use strict";

const Runner = require("./runner");

/**
 * Executes runner on tree
 * @param {Object} tree
 * @param {Object} info
 * @param {Object} options
 * @param {Array} args
 * @param {Object} ctx
 * @returns {String}
 */
module.exports = function (tree, commands, keys, options) {
    const runner = new Runner(commands, keys, options.runner);

    return runner.execArr(tree).join("");
};
