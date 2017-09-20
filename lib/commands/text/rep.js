"use strict";

/**
 * rep command
 * @param {Array} dataRaw
 * @returns {String}
 */
module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length !== 3) {
        return new Error("invalid args");
    } else {
        const data = this.execArr(dataRaw);
        const newrep = this.keys.get("newrep");
        const needle = data[0];
        const haystack = newrep ? data[2] : data[1];
        const replacement = newrep ? data[1] : data[2];
        const regex = new RegExp(needle, "g");

        return haystack.replace(regex, replacement);
    }
};
