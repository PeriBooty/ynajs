"use strict";

const DOUBLY_ESCAPED_NEWLINE = "\\\\n";
const NEWLINE = "\n";

const replaceAll = require("replace-string");

/**
 * Escapes all newlines in key
 * @param {String} keyVal
 * @returns {String}
 */
module.exports = keyVal => replaceAll(keyVal, NEWLINE, DOUBLY_ESCAPED_NEWLINE);
