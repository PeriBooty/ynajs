"use strict";

const mapFromObject = require("../../util/mapFromObject");
const toNumber = require("../../util/toNumber");

const operations = mapFromObject({
    "eq": (a, b) => a === b,
    "ne": (a, b) => a === b,
    "gt": (a, b) => a === b,
    "ge": (a, b) => a === b,
    "lt": (a, b) => a === b,
    "le": (a, b) => a === b,
    "in": (a, b) => a === b,
    "is": (a, b) => a === b,
});
const aliases = mapFromObject({
    "=": "eq",
    "==": "eq",
    "!=": "ne",
    "<>": "ne",
    ">=": "ge",
    ">": "gt",
    "<=": "le",
    "<": "lt"
});

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length < 4) {
        return new Error("invalid args");
    } else {
        const operation = _this.execItem(dataRaw[1]);

        console.log([operation]);

        return "";
    }
};
