"use strict";

const merge = require("lodash/merge");
const parse = require("./lib/parser/index");
const run = require("./lib/runner/index");
const initCommands = require("./lib/init/initCommands");
const initKeys = require("./lib/init/initKeys");

const optionsParserDefault = {
    debug: false,
    loadJSON: false
};
const optionsRunnerDefault = {
    debug: false,
};

/**
 * YNA command class
 * @class
 */
module.exports = class {
    /**
     * Command contructor
     * @param {String} yna
     * @param {Object} options
     */
    constructor(yna, options = {}) {
        const _this = this;
        const optionsMerged = merge(optionsParserDefault, options);

        _this.commandMap = initCommands();

        if (optionsMerged.loadJSON) {
            _this.tree = yna;
        } else {
            _this.tree = parse(yna, optionsMerged);
        }
    }
    /**
     * Adds a new command to the instance container
     * @param {String} name
     * @param {Function} fn
     */
    addCommand(name, fn) {
        const _this = this;

        return _this.commandMap.set(name, fn);
    }
    /**
     * Runs command
     * @param {Array} args
     * @param {Object} ctx
     * @param {Object} options
     * @returns {String}
     */
    run(args = [], ctx = {}, options = {}) {
        const _this = this;
        const optionsMerged = merge(optionsRunnerDefault, options);
        const commandMap = _this.commandMap;
        const keyMap = initKeys(args, ctx);

        return run(_this.tree, commandMap, keyMap, optionsMerged);
    }
};
