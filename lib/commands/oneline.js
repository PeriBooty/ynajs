"use strict";

module.exports = function (dataRaw) {
    const _this = this;
    const text = _this.execItem(dataRaw[0]);
    const lines = text.split("\n").map(line => {
        let result = line.replace("\\n","\n").trimLeft();

        if (result.endsWith("\\")) {
            result = result.substr(0, result.length - 2) + "\n";
        }

        return result;
    });


    return lines.join("");
};
