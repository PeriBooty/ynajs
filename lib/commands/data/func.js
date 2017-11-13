"use strict";

const isKey = require("../../types/isKey");
const escapeKeyVal = require("../../util/escapeKeyVal");

/**
 * func command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
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
            //Evaluate value on fn call
            const code = () => {
                let result;

                this.options.depth++;

                if (this.options.depth <= this.lang.config.maxRecursionDepth) {
                    result = escapeKeyVal(this.transformer(this.execItem(dataRaw[1])));
                } else {
                    result = new Error("max recursion depth exceeded");
                }

                this.options.depth--;

                return result;
            };

            this.keys.set(key, code);

            return "";
        }
    }
};
