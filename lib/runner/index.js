"use strict";

const Runner = require("./runner");

/**
 * Executes runner on tree
 *
 * @param {Object} tree
 * @param {Map} commandMap
 * @param {Map} keyMap
 * @param {Object} options
 * @returns {string}
 */
module.exports = function (tree, commandMap, keyMap, options, data) {
    const runner = new Runner(commandMap, keyMap, options, data);

    return runner.execItem(tree);
};
