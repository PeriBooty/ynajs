"use strict";

const { randomNumber } = require("lightdash");
const isNumber = require("../../types/isNumber");
const toNumber = require("../../types/toNumber");

/**
 * num command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
 */
module.exports = function(dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no args");
    }

    const data = this.execArr(dataRaw);

    if (!data.every(isNumber)) {
        return new Error("invalid args");
    }

    let min = 0;
    let max = 100;
    let step = 1;

    if (data.length === 1) {
        max = toNumber(data[0]);
    } else if (data.length > 1) {
        min = toNumber(data[0]);
        max = toNumber(data[1]);
    }

    if (data.length === 3) {
        step = toNumber(data[2]);
    }

    if (min === max || step === 0) {
        return new Error("invalid range");
    }

    return Math.floor(randomNumber(min, max, false) / step) * step;
};
