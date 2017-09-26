"use strict";

const LANGUAGE_YNA = require("../language");

const execItem = require("./runnerExecItem");
const execArr = require("./runnerExecArr");
const resolveKey = require("./runnerResolveKey");
const resolveCommand = require("./runnerResolveCommand");
const transformerDefault = require("./transformer/default");
const log = require("../util/log");

/**
 * Runner class
 *
 * @class
 */
const Runner = class {
    /**
     * Runner constructor
     *
     * @constructor
     * @param {Map} commands
     * @param {Map} keys
     * @param {Object} options
     */
    constructor(commands, keys, options) {
        this.name = "RUNNER";
        this.lang = LANGUAGE_YNA;
        this.commands = commands;
        this.keys = keys;
        this.options = options;
        this.transformer = transformerDefault;
    }
};

/**
 * Need to be bound es5-style as you cannot use variables for class methods
 */
Runner.prototype.execItem = execItem;
Runner.prototype.execArr = execArr;
Runner.prototype.resolveKey = resolveKey;
Runner.prototype.resolveCommand = resolveCommand;
Runner.prototype.log = log;

module.exports = Runner;
