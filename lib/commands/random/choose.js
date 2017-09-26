"use strict";

const {
    random
} = require("lodash");

/**
 * Choose command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
 */
module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no options");
    } else {
        const options = this.execArr(dataRaw);
        const index = random(0, options.length - 1);

        return options[index];
    }
};
