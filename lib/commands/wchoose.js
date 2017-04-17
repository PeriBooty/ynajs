"use strict";

const random = require("lodash/random");
const isNumber = require("../types/isNumber");
const toNumber = require("../types/toNumber");

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length === 0) {
        return new Error("no options");
    } else if (dataRaw.length % 2 !== 0) {
        return new Error("mismatched weighting");
    } else {
        const data = _this.execArr(dataRaw);
        const weights = [];
        const values = [];
        let areWeightsNumbers = true;

        data.forEach((item, index) => {
            if (index % 2 === 0) {
                values.push(item);
            } else {
                if (isNumber(item)) {
                    weights.push(toNumber(item));
                } else {
                    areWeightsNumbers = false;
                }
            }
        });

        if (!areWeightsNumbers) {
            return new Error("invalid weight");
        } else {
            const distributedValues = [];
            let index;

            weights.forEach((weight, i) => {
                const value = values[i];
                const distributed = new Array(weight).fill(value);

                distributedValues.push(...distributed);
            });

            index = random(0, distributedValues.length - 1);

            return distributedValues[index];
        }
    }
};
