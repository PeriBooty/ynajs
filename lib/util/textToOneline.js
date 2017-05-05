"use strict";

const BACKSLASH = "\\";
const NEWLINE = "\n";
const ESCAPED_NEWLINE = "\\n";

module.exports= function (text) {
    const result = text.split(NEWLINE).map(line => {
        let lineTrimmed = line.trimLeft();

        if (lineTrimmed.endsWith(BACKSLASH)) {
            lineTrimmed = lineTrimmed.substr(0, lineTrimmed.length - 1) + "\n";
        }

        lineTrimmed = lineTrimmed.replace(ESCAPED_NEWLINE, NEWLINE);

        return lineTrimmed;
    }).join("");

    return result;
};
