"use strict";

const mapFromObject = require("../util/mapFromObject");
const isNumber = require("../types/isNumber");
const isWord = require("../types/isWord");
const isLetter = require("../types/isLetter");
const isDecimal = require("../types/isDecimal");
const isError = require("../types/isError");
const isList = require("../types/isList");
const toNumber = require("../types/toNumber");
const toList = require("../types/toList");

const operations = mapFromObject({
    "eq": {
        type: "any",
        fn: (a, b) => a === b
    },
    "ne": {
        type: "any",
        fn: (a, b) => a !== b
    },
    "gt": {
        type: "number",
        fn: (a, b) => a > b
    },
    "ge": {
        type: "number",
        fn: (a, b) => a >= b
    },
    "lt": {
        type: "number",
        fn: (a, b) => a < b
    },
    "le": {
        type: "number",
        fn: (a, b) => a <= b
    },
    "in": {
        type: "any",
        fn: (a, b) => {
            const b_parsed = isList(b) ? toList(b) : b;

            return b_parsed.includes(a);
        }
    },
    "is": {
        type: "any",
        fn: (a, b) => {
            const typeFn = types.get(b);

            return typeFn(a);
        }
    },
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
const types = mapFromObject({
    "word": isWord,
    "letter": isLetter,
    "number": isNumber,
    "decimal": isDecimal,
    "error": isError
});

module.exports = function (dataRaw) {
    if (dataRaw.length < 4) {
        return new Error("invalid args");
    } else {
        const onTrue = () => this.execItem(dataRaw[3]);
        const onFalse = () => this.execItem(dataRaw[4]) || "";
        const operation = this.execItem(dataRaw[1]);
        let operationRef = null;
        let val1 = this.execItem(dataRaw[0]);
        let val2 = this.execItem(dataRaw[2]);

        if (operations.has(operation)) {
            operationRef = operations.get(operation);
        } else if (aliases.has(operation)) {
            operationRef = operations.get(aliases.get(operation));
        } else {
            return new Error("invalid operation");
        }

        //For number-only operations
        if (operationRef.type === "number") {
            if (!isNumber(val1) || !isNumber(val2)) {
                return new Error("args must be numbers");
            } else {
                val1 = toNumber(val1);
                val2 = toNumber(val2);
            }
        }

        //for type lookup
        if (operation === "is") {
            if (!types.has(val2)) {
                return new Error("invalid type name");
            }
        }

        return operationRef.fn(val1, val2) ? onTrue() : onFalse();
    }
};
