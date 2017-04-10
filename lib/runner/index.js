"use strict";

const initCommands = require("./initCommands");
const initKeys = require("./initKeys");

const execItem = require("./execItem");
const execArr = require("./execArr");
const execKey = require("./execKey");
const execCommand = require("./execCommand");


const Runner = function (commands, keys, options, debug) {
    const _this = this;

    _this.commands = commands;
    _this.keys = keys;
    _this.options = options;
    _this.debug = debug;
};
Runner.prototype.execItem = execItem;
Runner.prototype.execArr = execArr;
Runner.prototype.execCommand = execCommand;
Runner.prototype.execKey = execKey;

module.exports = function (tree, info, options, args = [], mentions = [], ctx = {}) {
    const commands = initCommands();
    const keys = initKeys(info, args, mentions, ctx);
    const runner = new Runner(commands, keys, options.runner, options.debug);

    return runner.execArr(tree).join("");
};
