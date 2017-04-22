"use strict";

const merge = require("lodash/merge");
const parse = require("./lib/parser/index");
const run = require("./lib/runner/index");
const initCommands = require("./lib/init/initCommands");
const initKeys = require("./lib/init/initKeys");

const infoDefault = {
    name: "anonymous"
};
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
     * @param {Object} info
     * @param {Object} options
     */
    constructor(yna, info, options) {
        const _this = this;

        _this.info = merge(infoDefault, info);
        _this.options = merge(optionsDefault, options);

        _this.commands = initCommands();

        _this.tree = _this.options.parser.loadJSON ? yna : parse(yna, _this.options);
    }
    /**
     * Runs command
     * @param {Array} args
     * @param {Object} ctx
     * @returns {String}
     */
    run(args = [], ctx = {}) {
        const _this = this;
        const keys = initKeys(_this.info, args, ctx);

        return run(_this.tree, _this.commands, keys, _this.options);
    }
};
