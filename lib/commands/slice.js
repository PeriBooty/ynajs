"use strict";

const isNumber = require("../types/isNumber");
const isWord = require("../types/isWord");
const isLetter = require("../types/isLetter");
const isDecimal = require("../types/isDecimal");
const isError = require("../types/isError");
const isList = require("../types/isList");
const toNumber = require("../types/toNumber");
const toList = require("../types/toList");

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length === 1) {
        return new Error("bad content");
    } else {
        const data = _this.execArr(dataRaw);
        const text = data[1];
        const sliceMode = isList(data[0]);
        const sliceRaw = sliceMode ? toList(data[0]) : [data[0]];

        if (!sliceRaw.every(isNumber)) {
            return new Error("non int index");
        } else {
            const slice = sliceRaw.map(toNumber);

            if (slice.length === 1) {
                return text.substr(slice[0], 1);
            } else if (slice.length === 2) {
                return text.substr(slice[0], slice[1]);
            } else if (slice.length === 3) {
                if (slice[2] === 0) {
                    return new Error("zero step");
                } else {
                    const text_sliced = text.substr(slice[0], slice[1]);

                    return text_sliced.split("").filter((item, index) => index % slice[2] === 0).join("");
                }
            } else {
                return new Error("too many nums");
            }
        }
    }
};
