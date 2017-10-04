"use strict";

const Parser = require("./parser");
/**
 * Runs parser on string
 *
 * @param {string} yna
 * @param {Object} options
 * @returns {Object}
 */
module.exports = function (yna, options, data) {
    if (options.loadJSON) {
        return yna;
    } else {
        const parser = new Parser(options, data);

        return parser.parseString(yna);
    }
};
