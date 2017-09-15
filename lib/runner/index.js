"use strict";

const Runner = require("./runner");
const {
    merge
} = require("lodash");

const optionsRunnerDefault = function () {
    return {
        debug: false,
        plugins: {
            discord: {
                msg: null, //Discord.js message collection
                app: null //Di-ngy app instance
            }
        },
        depth: 0
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
