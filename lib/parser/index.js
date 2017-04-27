"use strict";

const Parser = require("./parser");

/**
 * Runs parser on string
 * @param {String} yna
 * @param {Object} options
 * @returns {Object}
 */
module.exports = function (yna, options) {
    const parser = new Parser(options);

    return parser.parseString(yna);
};
