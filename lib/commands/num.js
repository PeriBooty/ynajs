"use strict";

const random = require("lodash/random");
const isNumber = require("../types/isNumber");
const toNumber = require("../types/toNumber");

module.exports = function (dataRaw) {
    if (dataRaw.length > 3) {
        return new Error("too many args");
    } else {
        const data = this.execArr(dataRaw);

        if (!data.every(isNumber)) {
            return new Error("invalid args");
        } else {
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

            if (range[0] === range[1] || step === 0) {
                return new Error("invalid range");
            } else {
                return Math.floor(random(...range) / step) * step;
            }
        }
    }
};
