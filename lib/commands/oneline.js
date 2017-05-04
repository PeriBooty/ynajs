"use strict";

const BACKSLASH = "\\";
const NEWLINE = "\n";
const ESCPAED_NEWLINE = "\\n";

module.exports = function (dataRaw) {
    const _this = this;
    const text = _this.execItem(dataRaw[0]);
    const lines = text.split(NEWLINE).map(line => {
        let result = line.trimLeft();

        if (result.endsWith(BACKSLASH)) {
            result = result.substr(0, result.length - 1) + "\n";
        }

        result = result.replace(ESCPAED_NEWLINE, NEWLINE);

        return result;
    });

    console.log({
        text,
        lines
    });

    return lines.join("");
};
