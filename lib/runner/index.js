"use strict";

const Runner = require("./runner");
const {
    merge
} = require("lodash");

const optionsRunnerDefault = function () {
    return {
        debug: false,
    };
};

/**
 * Executes runner on tree
 * @param {Object} tree
 * @param {Map} commandMap
 * @param {Map} keyMap
 * @param {Object} options
 * @returns {String}
 */
module.exports = function (tree, commandMap, keyMap, options) {
    const optionsMerged = merge(optionsRunnerDefault(), options);
    const runner = new Runner(commandMap, keyMap, optionsMerged);

    return runner.execItem(tree);
};
