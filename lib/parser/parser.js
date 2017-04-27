"use strict";

const controlChars = require("../language.json");
const parseString = require("./parserParseString");
const parseCommand = require("./parserParseCommand");
const parseCommandData = require("./parserParseCommandData");
const log = require("../util/log");

/**
 * Parser instance
 * @constructor
 * @param {Object} options
 */
const Parser = function (options) {
    const _this = this;

    _this.name = "PARSER";
    _this.controlChars = controlChars;
    _this.options = options;
};

Parser.prototype.parseString = parseString;
Parser.prototype.parseCommand = parseCommand;
Parser.prototype.parseCommandData = parseCommandData;
Parser.prototype.log = log;

module.exports = Parser;
