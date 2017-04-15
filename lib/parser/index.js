"use strict";

const Parser = require("./parser");
const treeControl = {
    open: "{",
    close: "}",
    data: ":",
   // list: ",",
    delimiter: ";",
    comment: "!",
    escape: ">"
};

/**
 * Runs parser on string
 * @param {String} na
 * @param {Object} options
 * @returns {Object}
 */
module.exports = function (na, options) {
    const parser = new Parser(treeControl, options.parser);

    return parser.parseString(na);
};
