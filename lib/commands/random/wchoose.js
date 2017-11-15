"use strict";

const {
    randomNumber
} = require("lightdash");
const isNumber = require("../../types/isNumber");
const toNumber = require("../../types/toNumber");

/**
 * wchoose command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
 */
module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no options");
    } else if (dataRaw.length % 2 !== 0) {
        return new Error("mismatched weighting");
    } else {
        const data = this.execArr(dataRaw);
        const weights = [];
        const options = [];
        let areWeightsNumbers = true;

        data.forEach((item, index) => {
            if (index % 2 === 0) {
                options.push(item);
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
                const value = options[i];
                const distributed = new Array(weight).fill(value);

                distributedValues.push(...distributed);
            });

            index = randomNumber(0, distributedValues.length - 1, false);

            return distributedValues[index];
        }
    }
};
