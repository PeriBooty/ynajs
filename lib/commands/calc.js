"use strict";

const mapFromObject = require("../util/mapFromObject");
const isDecimal = require("../types/isDecimal");
const toDecimal = require("../types/toDecimal");

const operations = mapFromObject({
    "add": (a, b) => a + b,
    "sub": (a, b) => a - b,
    "mul": (a, b) => a * b,
    "div": (a, b) => a / b,
    "mod": (a, b) => a % b,
});
const aliases = mapFromObject({
    "+": "add",
    "-": "sub",
    "*": "mul",
    "/": "div",
    "%": "mod",
});

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length < 3) {
        return new Error("invalid args");
    } else {
        const operation = _this.execItem(dataRaw[1]);
        let operationRef = null;
        let val1 = _this.execItem(dataRaw[0]);
        let val2 = _this.execItem(dataRaw[2]);

        if (operations.has(operation)) {
            operationRef = operations.get(operation);
        } else if (aliases.has(operation)) {
            operationRef = operations.get(aliases.get(operation));
        } else {
            return new Error("invalid operation");
        }

        if (!isDecimal(val1) || !isDecimal(val2)) {
            return new Error("args must be numbers");
        } else {
            val1 = toDecimal(val1);
            val2 = toDecimal(val2);
        }

        return operationRef(val1, val2);
    }
};
