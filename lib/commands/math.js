"use strict";

const INFINITY = 2 ^ 31;
const INFINITY_NEGATIVE = -2 ^ 31;

const mapFromObject = require("../util/mapFromObject");
const isDecimal = require("../types/isDecimal");
const toDecimal = require("../types/toDecimal");

const operations = mapFromObject({
    "add": {
        args: 2,
        fn: (a, b) => a + b
    },
    "sub": {
        args: 2,
        fn: (a, b) => a - b
    },
    "mul": {
        args: 2,
        fn: (a, b) => a * b
    },
    "pow": {
        args: 2,
        fn: (a, b) => a ** b
    },
    "div": {
        args: 2,
        fn: (a, b) => b !== 0 ? a / b : new Error("divide by zero")
    },
    "idiv": {
        args: 2,
        fn: (a, b) => b !== 0 ? Math.floor(a / b) : new Error("divide by zero")
    },
    "mod": {
        args: 2,
        fn: (a, b) => a % b
    },
    "and": {
        args: 2,
        fn: (a, b) => a & b
    },
    "or": {
        args: 2,
        fn: (a, b) => a | b
    },
    "xor": {
        args: 2,
        fn: (a, b) => a ^ b
    },
    "not": {
        args: 1,
        fn: a => ~a
    },
    "round": {
        args: 1,
        fn: a => Math.round(a)
    },
    "floor": {
        args: 1,
        fn: a => Math.floor(a)
    },
    "ceil": {
        args: 1,
        fn: a => Math.ceil(a)
    },
});
const aliases = mapFromObject({
    "+": "add",
    "-": "sub",
    "*": "mul",
    "**": "pow",
    "/": "div",
    "/f": "div",
    "//": "idiv",
    "%": "mod",
    "&": "and",
    "|": "or",
    "^": "xor",
    "~": "not",
});

module.exports = function (dataRaw) {
    const _this = this;

    if (dataRaw.length > 3) {
        return new Error("too many args");
    } else {
        const operation = _this.execItem(dataRaw[0]);
        let operationRef = null;
        let vals = [];
        let result;

        if (operations.has(operation)) {
            operationRef = operations.get(operation);
        } else if (aliases.has(operation)) {
            operationRef = operations.get(aliases.get(operation));
        } else {
            return new Error("invalid operation");
        }

        if (dataRaw.length - 1 !== operationRef.args) {
            return new Error("invalid args");
        }

        for (let i = 0; i < operationRef.args; i++) {
            vals[i] = _this.execItem(dataRaw[i + 1]);
        }

        if (vals.some(val => !isDecimal(val))) {
            return new Error("args must be numbers");
        } else {
            vals = vals.map(toDecimal);
        }

        result = operationRef.fn(...vals);

        if (result > INFINITY) {
            return new Error("inf");
        } else if (result < INFINITY_NEGATIVE) {
            return new Error("-inf");
        } else {
            return result;
        }
    }
};
