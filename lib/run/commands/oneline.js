"use strict";

module.exports = function (dataRaw, exec, keys, commands) {
    const data = exec(dataRaw, keys, commands);
    const text = data[0];
    const lines = text.split("\n");


    return lines.map(line => {
        let result = line.trimLeft();

        if (result.endsWith("\\")) {
            result = result.substr(0, result.length - 2) + "\n";
        }

        return result;
    }).join("");
};
