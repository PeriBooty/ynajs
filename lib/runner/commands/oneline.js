"use strict";

module.exports = function (dataRaw) {
    const _this = this;
    const data = _this.execArr(dataRaw);
    const text = data.join("");
    const lines = text.split("\n").map(line => {
        let result = line.trimLeft();

        if (result.endsWith("\\")) {
            result = result.substr(0, result.length - 2) + "\n";
        }

        return result;
    });


    return lines.join("");
};
