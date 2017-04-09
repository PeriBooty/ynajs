"use strict";

const toNumber = require("../../convert/toNumber");
const arrIsType = require("./lib/arrIsType");

module.exports = function (dataRaw, exec, keys, commands) {
    const data = exec(dataRaw, keys, commands);
    const weights = [];
    const values = [];
    const distributedValues = [];
    let index;

    if (data.length === 0) {
        throw new Error("wchoose:no options");
    }
    if (data.length % 2 !== 0) {
        throw new Error("wchoose:mismatched weighting");
    }

    data.forEach((item, index) => {
        if (index % 2 === 0) {
            values.push(item);
        } else {
            weights.push(toNumber(item));
        }
    });

    if (!arrIsType(weights, "number")) {
        throw new Error("wchoose:invalid weight");
    }

    weights.forEach((weight, index) => {
        const value = values[index];
        const distributed = new Array(weight).fill(value);

        distributedValues.push(...distributed);
    });

    index = Math.floor(Math.random() * distributedValues.length);

    return distributedValues[index];
};
