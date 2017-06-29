"use strict";

const isKey = require("../types/isKey");
const escapeKeyVal = require("./lib/escapeKeyVal");

/**
 * set command
 * @param {Array} dataRaw
 * @returns {String}
 */
module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length !== 2) {
        return new Error("invalid args");
    } else {
        const data = this.execArr(dataRaw);
        const key = data[0];

        if (!isKey(key)) {
            return new Error("invalid key");
        } else {
            const val = escapeKeyVal(this.transformer(data[1]));

            this.keys.set(key, val);

            return "";
        }
    }
};
