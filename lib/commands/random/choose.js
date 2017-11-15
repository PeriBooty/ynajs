"use strict";

const {
    randomNumber
} = require("lightdash");

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
        const index = randomNumber(0, options.length - 1, false);

        return options[index];
    }
};
