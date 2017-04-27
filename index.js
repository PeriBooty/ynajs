"use strict";

const merge = require("lodash/merge");
const parse = require("./lib/parser/index");
const run = require("./lib/runner/index");
const initCommands = require("./lib/init/initCommands");
const initKeys = require("./lib/init/initKeys");

const optionsDefault = {
    parser: {
        loadJSON: false,
        debug: false,
        dropComments: true
    },
    runner: {
        debug: false
    }
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
    constructor(yna, options) {
        const _this = this;
        const optionsMerged = merge(optionsDefault.parser, options);

        _this.commandMap = initCommands();

        if (optionsMerged.loadJSON) {
            _this.tree = yna;
        } else {
            _this.tree = parse(yna, optionsMerged);
        }
    }
    /**
     * Runs command
     * @param {Array} args
     * @param {Object} ctx
     * @returns {String}
     */
    run(args = [], ctx = {}, options) {
        const _this = this;
        const optionsMerged = merge(optionsDefault.runner, options);
        const keyMap = initKeys(args, ctx);

        return run(_this.tree, _this.commandMap, keyMap, optionsMerged);
    }
};
