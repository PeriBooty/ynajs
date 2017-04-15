"use strict";

const execItem = require("./runnerExecItem");
const execArr = require("./runnerExecArr");
const execKey = require("./runnerExecKey");
const execCommand = require("./runnerExecCommand");
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
    _this.options = options;
};

Runner.prototype.execItem = execItem;
Runner.prototype.execArr = execArr;
Runner.prototype.execCommand = execCommand;
Runner.prototype.execKey = execKey;
Runner.prototype.log = log;

module.exports = Runner;
