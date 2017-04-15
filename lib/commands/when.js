"use strict";

const mapFromObject = require("../util/mapFromObject");
const toNumber = require("../types/toNumber");

const operations = mapFromObject({
    "eq": { type: "any", fn: (a, b) => a === b },
    "ne": { type: "any", fn: (a, b) => a !== b },
    "gt": { type: "number", fn: (a, b) => a > b },
    "ge": { type: "number", fn: (a, b) => a >= b },
    "lt": { type: "number", fn: (a, b) => a < b },
    "le": { type: "number", fn: (a, b) => a <= b },
    "in": { type: "string", fn: (a, b) => a.includes(b) },
    "is": { type: "any", fn: (a, b) => a.includes(b) },
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
        let operationFn = null;
        let result = false;
        let value1;
        let value2;
        let onTrue;
        let onFalse;

        if (operations.has(operation)) {
            operationFn = operations.get(operation);
        } else if (aliases.has(operation)) {
            operationFn = operations.get(aliases.get(operation));
        } else {
            return new Error("invalid operation");
        }

        //result = operationFn()

        return "";
    }
};
