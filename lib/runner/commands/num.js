"use strict";

const toNumber = require("../../convert/toNumber");
const arrIsType = require("./lib/arrIsType");

module.exports = function (dataRaw) {
    const _this = this;
    const data = _this.execArr(dataRaw);
    const range = [0, 100];
    let step = 1;

    if (data.length === 1) {
        range[1] = toNumber(data[0]);
    } else if (data.length > 1) {
        range[0] = toNumber(data[0]);
        range[1] = toNumber(data[1]);
    }

    if (data.length === 3) {
        step = toNumber(data[2]);
    }

    //Throws errors
    if (data.length > 3) {
        throw new Error("num:too many args");
    }
    if (!arrIsType([step, ...range], "number")) {
        throw new Error("num:invalid args");
    }
    if (step === 0 || range[0] === range[1]) {
        throw new Error("num:invalid range");
    }

    return Math.floor(Math.random() * ((range[1] - range[0])) / step + 1) * step;
};
