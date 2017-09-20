"use strict";

const Runner = require("./runner");
const {
    defaultsDeep
} = require("lodash");

const optionsRunnerDefault = {
    debug: false,
    plugins: {
        discord: {
            msg: null, //Discord.js message collection
            app: null //Di-ngy app instance
        }
    },
    depth: 0
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
    const optionsMerged = defaultsDeep(options, optionsRunnerDefault);
    const runner = new Runner(commandMap, keyMap, optionsMerged);

    return runner.execItem(tree);
};
