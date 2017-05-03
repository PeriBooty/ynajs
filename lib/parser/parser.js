"use strict";

const LANGUAGE_YNA = require("../language");
const parseString = require("./parseString");
const parseStruct = require("./parseStruct");
const parseStructData = require("./parseStructData");
const log = require("../util/log");

/**
 * Parser instance
 * @class
 */
const Parser = class {
    /**
     * Parser constructor
     * @constructor
     * @param {Object} options
     */
    constructor(options) {
        const _this = this;

        _this.name = "PARSER";
        _this.lang = LANGUAGE_YNA;
        _this.options = options;
    }
};

Parser.prototype.parseString = parseString;
Parser.prototype.parseStruct = parseStruct;
Parser.prototype.parseStructData = parseStructData;
Parser.prototype.log = log;

module.exports = Parser;
