"use strict";

const { randomItem } = require("lightdash");

/**
 * Choose command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
 */
module.exports = function(dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no options");
    }

    const options = this.execArr(dataRaw);

    return randomItem(options);
};
