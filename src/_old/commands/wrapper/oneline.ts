"use strict";

const NEWLINE = "\n";
const BACKSLASH_ESCAPED = "\\";

/**
 * Trims a single line
 *
 * @param {string} line
 * @returns {string}
 */
const trimLine = function(line) {
    let trimmed = line.trimLeft();

    if (line.endsWith(BACKSLASH_ESCAPED)) {
        trimmed =
            trimmed.substr(0, trimmed.length - BACKSLASH_ESCAPED.length) +
            "\\n";
    }

    return trimmed;
};

/**
 * Transformer for oneline
 *
 * @param {string} str
 * @returns {string}
 */
const transformerOneline = function(str) {
    const result = str
        .split(NEWLINE)
        .map(line => trimLine(line))
        .join("");

    return result.replace(/\\n/g, NEWLINE);
};

/**
 * oneline command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
 */
module.exports = function(dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no content");
    }

    const content = this.execItem(dataRaw[0], transformerOneline); // Attach transformer

    return transformerOneline(content);
};
