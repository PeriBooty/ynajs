"use strict";

const LANGUAGE_YNA = require("../language");
const execItem = require("./runnerExecItem");
const execArr = require("./runnerExecArr");
const resolveKey = require("./runnerResolveKey");
const resolveCommand = require("./runnerResolveCommand");
const recurseTransform = require("./runnerRecurseTransform");
const log = require("../util/log");

/**
 * Runner instance
 * @constructor
 * @param {Map} commands
 * @param {Map} keys
 * @param {Object} options
 */
const Runner = function (commands, keys, options) {
    const _this = this;

    _this.name = "RUNNER";
    _this.commands = commands;
    _this.keys = keys;
    _this.lang = LANGUAGE_YNA;
    _this.options = options;
};

Runner.prototype.execItem = execItem;
Runner.prototype.execArr = execArr;
Runner.prototype.resolveKey = resolveKey;
Runner.prototype.resolveCommand = resolveCommand;
Runner.prototype.recurseTransform = recurseTransform;
Runner.prototype.log = log;

module.exports = Runner;
