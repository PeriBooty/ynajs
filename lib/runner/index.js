"use strict";

const Runner = require("./runner");

/**
 * Executes runner on tree
 * @param {Object} tree
 * @param {Map} commandMap
 * @param {Map} keyMap
 * @param {Object} options
 * @returns {String}
 */
module.exports = function (tree, commandMap, keyMap, options) {
    const runner = new Runner(commandMap, keyMap, options);

    return runner.execItem(tree);
};
