"use strict";

const slice = require("pyslice");
const isNumber = require("../../types/isNumber");
const isList = require("../../types/isList");
const toNumber = require("../../types/toNumber");
const toList = require("../../types/toList");

/**
 * slice command
 * @param {Array} dataRaw
 * @returns {String}
 */
module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length !== 2) {
        return new Error("bad content");
    } else {
        const data = this.execArr(dataRaw);
        const content = data[1];
        const sliceInput = isList(data[0]) ? toList(data[0]) : [data[0]];

        if (sliceInput.length > 3) {
            return new Error("too many nums");
        } else {
            if (!sliceInput.every(input => isNumber(input) || input === "")) {
                return new Error("non int index");
            } else {
                const sliceInputParsed = sliceInput.map(input => input !== "" ? toNumber(input) : false);

                if (sliceInputParsed[2] === 0) {
                    return new Error("zero step");
                } else {
                    if (sliceInputParsed[2] === false) {
                        return slice(content, sliceInputParsed[0], sliceInputParsed[1]);
                    } else {
                        return slice(content, sliceInputParsed[0], sliceInputParsed[1], sliceInputParsed[2]);
                    }
                }
            }
        }
    }
};