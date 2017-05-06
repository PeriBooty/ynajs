"use strict";

const EMPTY = "";
const BACKSLASH = "\\";
const ESCAPED_NEWLINE = "\\n";
const NEWLINE = "\n";

const replaceAll = require("replace-string");

const trimLine = function (line) {
    let trimmed = line.trimLeft();

    if (line.endsWith(BACKSLASH)) {
        trimmed = trimmed.substr(0, trimmed.length - BACKSLASH.length) + ESCAPED_NEWLINE;
    }

    return trimmed;
};

const transformerOneline = function (str) {
    const result = str.split(NEWLINE).map(line => trimLine(line)).join(EMPTY);

    return replaceAll(result, ESCAPED_NEWLINE, NEWLINE);
};

module.exports = function (dataRaw) {
    const _this = this;
    const text = _this.execItem(dataRaw[0], transformerOneline);

    return text;
};
