"use strict";

const Parser = require("./parser");
const {
    defaultsDeep
} = require("lodash");

const optionsParserDefault = {
    debug: false,
    loadJSON: false
};

/**
 * Runs parser on string
 * @param {String} yna
 * @param {Object} options
 * @returns {Object}
 */
module.exports = function (yna, options) {
    const optionsMerged = defaultsDeep(options, optionsParserDefault);

    if (optionsMerged.loadJSON) {
        return yna;
    } else {
        const parser = new Parser(optionsMerged);

        return parser.parseString(yna);
    }
};
