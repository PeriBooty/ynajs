"use strict";

module.exports = function (dataRaw) {
    const _this = this;
    const text = _this.execItem(dataRaw[0]);
    const lines = text.replace("\\n","\n").split("\n").map(line => {
        let result = line.trimLeft();

        if (result.endsWith("\\")) {
            result = result.substr(0, result.length - 1) + "\n";
        }

        return result;
    });


    return lines.join("");
};
