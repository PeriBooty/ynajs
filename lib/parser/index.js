"use strict";

const Parser = require("./parser");

/**
 * Runs parser on string
 * @param {String} na
 * @param {Object} options
 * @returns {Object}
 */
module.exports = function (na, options) {
    const parser = new Parser(options.parser);

    return parser.parseString(na);
};
