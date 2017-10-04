"use strict";

const parse = require("./lib/parser");
const run = require("./lib/runner");
const initCommands = require("./lib/init/initCommands");
const initKeys = require("./lib/init/initKeys");
const {
    defaultsDeep
} = require("lodash");

const optionsDefault = {
    debug: false,
    loadJSON: false,
    plugins: {
        init: true,
        discord: false
    }
};
const optionsRunnerDefault = {
    debug: false,
    depth: 0
};
const dataDefault = {
    discord: {
        msg: null, //Discord.js message collection
        app: null, //Di-ngy app instance
        storing: {
            tag: null,
            tagStorage: null,
            tagKey: null,
        }
    }
};

/**
 * YNA command class
 *
 * @class
 */
module.exports = class {
    /**
     * Command contructor
     *
     * @param {string} yna
     * @param {Object} [options={}]
     */
    constructor(yna, options = {}, data = {}) {
        const optionsMerged = defaultsDeep(options, optionsDefault);
        const dataMerged = defaultsDeep(data, dataDefault);

        this.tree = parse(yna, optionsMerged, dataMerged);
        this.commandMap = initCommands(optionsMerged);
    }
    /**
     * Adds a new command to the instance container
     *
     * @param {string} name
     * @param {function} fn
     */
    addCommand(name, fn) {
        this.commandMap.set(name, fn);
    }
    /**
     * Runs command
     *
     * @param {Array<string>} [args=[]]
     * @param {Object} [ctx={}]
     * @param {Object} [options={}]
     * @returns {string}
     */
    run(args = [], ctx = {}, options = {}, data = {}) {
        const optionsMerged = defaultsDeep(options, optionsRunnerDefault);
        const dataMerged = defaultsDeep(data, dataDefault);
        const keyMap = initKeys(args, ctx);

        return run(this.tree, this.commandMap, keyMap, optionsMerged, dataMerged);
    }
};
