"use strict";

const parseString = require("./parseString");
const parseCommand = require("./parseCommand");
const parseCommandData = require("./parseCommandData");
const log = require("../util/log");
const treeControl = {
    open: "{",
    close: "}",
    data: ":",
    list: ",",
    delimiter: ";",
    comment: "!",
    escape: ">"
};

const Parser = function (controlChars, options, debug) {
    const _this = this;

    _this.name = "PARSER";
    _this.controlChars = controlChars;
    _this.options = options;
    _this.debug = debug;
};
Parser.prototype.parseString = parseString;
Parser.prototype.parseCommand = parseCommand;
Parser.prototype.parseCommandData = parseCommandData;
Parser.prototype.log = log;

module.exports = function (na, options) {
    const parser = new Parser(treeControl, options.parser, options.debug);

    return parser.parseString(na);
};
