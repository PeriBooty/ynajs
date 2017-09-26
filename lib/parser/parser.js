"use strict";

const LANGUAGE_YNA = require("../language");

const parseString = require("./parseString");
const parseStruct = require("./parseStruct");
const parseStructData = require("./parseStructData");
const log = require("../util/log");

/**
 * Parser class
 *
 * @class
 */
const Parser = class {
    /**
     * Parser constructor
     *
     * @constructor
     * @param {Object} options
     */
    constructor(options) {
        this.name = "PARSER";
        this.lang = LANGUAGE_YNA;
        this.options = options;
    }
};

/**
 * Need to be bound es5-style as you cannot use variables for class methods
 */
Parser.prototype.parseString = parseString;
Parser.prototype.parseStruct = parseStruct;
Parser.prototype.parseStructData = parseStructData;
Parser.prototype.log = log;

module.exports = Parser;
