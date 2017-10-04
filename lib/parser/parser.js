"use strict";

const LANGUAGE_YNA = require("../language");

const parseString = require("./parseString");
const parseBlock = require("./parseBlock");
const parseBlockData = require("./parseBlockData");
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
    constructor(options, data) {
        this.name = "PARSER";
        this.lang = LANGUAGE_YNA;
        this.options = options;
        this.data = data;
    }
};

/**
 * Need to be bound es5-style as you cannot use variables for class methods
 */
Parser.prototype.parseString = parseString;
Parser.prototype.parseBlock = parseBlock;
Parser.prototype.parseBlockData = parseBlockData;
Parser.prototype.log = log;

module.exports = Parser;
