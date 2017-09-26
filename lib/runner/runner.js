"use strict";

const LANGUAGE_YNA = require("../language");

const execItem = require("./runnerExecItem");
const execArr = require("./runnerExecArr");
const resolveKey = require("./runnerResolveKey");
const resolveCommand = require("./runnerResolveCommand");
const transformerDefault = require("./transformer/default");
const log = require("../util/log");

/**
 * Runner instance
 *
 * @constructor
 * @param {Map} commands
 * @param {Map} keys
 * @param {Object} options
 */
const Runner = function (commands, keys, options) {
    const _this = this;

    _this.name = "RUNNER";
    _this.lang = LANGUAGE_YNA;
    _this.commands = commands;
    _this.keys = keys;
    _this.options = options;
    _this.transformer = transformerDefault;
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
