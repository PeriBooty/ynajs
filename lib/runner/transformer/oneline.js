"use strict";

const replaceString = require("replace-string");

const EMPTY = "";
const BACKSLASH = "\\";
const ESCAPED_NEWLINE = "\\n";
const NEWLINE = "\n";

/**
 * Replaces Newlines and leading spaces
 * @param {String} Text
 * @returns {String}
 */
module.exports = function (text) {
    let result = text
        .split(NEWLINE)
        .map(line => {
            let trimmed = line.trimLeft();

            if (line.endsWith(BACKSLASH)) {
                trimmed = trimmed.substr(0, trimmed.length - BACKSLASH.length) + ESCAPED_NEWLINE;
            }

            return trimmed;
        })
        .join(EMPTY);

    result = replaceString(result, ESCAPED_NEWLINE, NEWLINE);

    return result;
};
