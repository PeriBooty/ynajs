"use strict";

const execItem = require("./execItem");
const execArr = require("./execArr");
const execKey = require("./execKey");
const execCommand = require("./execCommand");
const log = require("../util/log");

const initCommands = require("./initCommands");
const initKeys = require("./initKeys");

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

module.exports = function (tree, info, options, args = [], mentions = [], ctx = {}) {
    const commands = initCommands();
    const keys = initKeys(info, args, mentions, ctx);
    const runner = new Runner(commands, keys, options.runner);

    return runner.execArr(tree).join("");
};
