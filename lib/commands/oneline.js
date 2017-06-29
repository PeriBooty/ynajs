"use strict";

const EMPTY = "";
const BACKSLASH = "\\";
const ESCAPED_NEWLINE = "\\n";
const NEWLINE = "\n";

const replaceAll = require("replace-string");


/**
 * Trims a single line
 * @param {String} line
 * @returns {String}
 */
const trimLine = function (line) {
    let trimmed = line.trimLeft();

    if (line.endsWith(BACKSLASH)) {
        trimmed = trimmed.substr(0, trimmed.length - BACKSLASH.length) + ESCAPED_NEWLINE;
    }

    return trimmed;
};

/**
 * Transformer for oneline
 * @param {String} str
 * @returns String
 */
const transformerOneline = function (str) {
    const result = str.split(NEWLINE).map(line => trimLine(line)).join(EMPTY);

    return replaceAll(result, ESCAPED_NEWLINE, NEWLINE);
};

/**
 * oneline command
 * @param {Array} dataRaw
 * @returns {String}
 */
module.exports = function (dataRaw) {
    const content = this.execItem(dataRaw[0], transformerOneline);//attach transformer

    return transformerOneline(content);
};
