"use strict";

const toNumber = require("../../util/toNumber");
const arrIsType = require("../../util/arrIsType");

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

        data.forEach((item, index) => {
            if (index % 2 === 0) {
                values.push(item);
            } else {
                weights.push(toNumber(item));
            }
        });

        if (!arrIsType(weights, "number")) {
            return new Error("invalid weight");
        } else {
            const distributedValues = [];
            let valueIndex;

            weights.forEach((weight, index) => {
                const value = values[index];
                const distributed = new Array(weight).fill(value);

                distributedValues.push(...distributed);
            });

            valueIndex = Math.floor(Math.random() * distributedValues.length);

            return distributedValues[valueIndex];
        }
    }
};
