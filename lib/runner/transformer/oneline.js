"use strict";

const EMPTY = "";
const BACKSLASH = "\\";
const ESCAPED_NEWLINE = "\\n";
const NEWLINE = "\n";

const replaceString = require("replace-string");

const trimLine = function (line) {
    let trimmed = line.trimLeft();

    if (line.endsWith(BACKSLASH)) {
        trimmed = trimmed.substr(0, trimmed.length - BACKSLASH.length) + ESCAPED_NEWLINE;
    }

    return trimmed;
};

module.exports= function (str) {
    let result = str.split(NEWLINE).map(line => trimLine(line)).join(EMPTY);

    result = replaceString(result, ESCAPED_NEWLINE, NEWLINE);

    return result;
};
