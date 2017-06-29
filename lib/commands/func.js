"use strict";

const isKey = require("../types/isKey");
const escapeKeyVal = require("./lib/escapeKeyVal");

/**
 * func command
 * @param {Array} dataRaw
 * @returns {String}
 */
module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length !== 2) {
        return new Error("invalid args");
    } else {
        const key = this.execItem(dataRaw[0]); //Evaluate key directly

        if (!isKey(key)) {
            return new Error("invalid key");
        } else {
            const code = () => escapeKeyVal(this.transformer(this.execItem(dataRaw[1]))); //Evaluate value on fn call

            this.keys.set(key, code);

            return "";
        }
    }
};
