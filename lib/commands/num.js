"use strict";

const random = require("lodash/random");
const toNumber = require("../types/toNumber");
const checkArrayType = require("../util/checkArrayType");

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length > 3) {
        return new Error("too many args");
    } else {
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

        if (!checkArrayType([step, ...range], "number")) {
            return new Error("invalid args");
        } else if (step === 0 || range[0] === range[1]) {
            return new Error("invalid range");
        } else {
            return Math.floor(random(...range) / step) * step;
        }
    }
};
