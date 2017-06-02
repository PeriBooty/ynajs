"use strict";

module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length !== 3) {
        return new Error("invalid args");
    } else {
        const data = this.execArr(dataRaw);
        const needle = data[0];
        const haystack = data[1];
        const replacement = data[2];
        const regex = new RegExp(needle, "g");

        return haystack.replace(regex, replacement);
    }
};
