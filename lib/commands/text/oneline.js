"use strict";

const BACKSLASH = "\\";

/**
 * Trims a single line
 * @param {String} line
 * @returns {String}
 */
const trimLine = function (line) {
    let trimmed = line.trimLeft();

    if (line.endsWith(BACKSLASH)) {
        trimmed = trimmed.substr(0, trimmed.length - BACKSLASH.length) + "\\n";
    }

    return trimmed;
};

/**
 * Transformer for oneline
 * @param {String} str
 * @returns String
 */
const transformerOneline = function (str) {
    const result = str.split("\n").map(line => trimLine(line)).join("");

    return result.replace(/\\n/g, "\n");
};

/**
 * oneline command
 * @param {Array} dataRaw
 * @returns {String}
 */
module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no content");
    } else {
        const content = this.execItem(dataRaw[0], transformerOneline); //attach transformer

        return transformerOneline(content);
    }
};
