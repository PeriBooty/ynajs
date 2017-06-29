"use strict";

const Parser = require("./parser");
const {
    merge
} = require("lodash");

const optionsParserDefault = function () {
    return {
        debug: false,
        loadJSON: false
    };
};

/**
 * Runs parser on string
 * @param {String} yna
 * @param {Object} options
 * @returns {Object}
 */
module.exports = function (yna, options) {
    const optionsMerged = merge(optionsParserDefault(), options);

    if (optionsMerged.loadJSON) {
        return yna;
    } else {
        const parser = new Parser(optionsMerged);

        return parser.parseString(yna);
    }
};
