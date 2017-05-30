"use strict";

const MAX = Math.pow(2, 32) - 1;
const MIN = -Math.pow(2, 32) + 1;

const mapFromObject = require("../util/mapFromObject");
const isDecimal = require("../types/isDecimal");
const toDecimal = require("../types/toDecimal");

const operations = mapFromObject({
    "add": {
        range: [2, Infinity],
        fn: function () {
            return Array.from(arguments).reduce((a, b) => a + b);
        }
    },
    "sub": {
        range: [2, 2],
        fn: function () {
            return Array.from(arguments).reduce((a, b) => a - b);
        }
    },
    "mul": {
        range: [2, Infinity],
        fn: function () {
            return Array.from(arguments).reduce((a, b) => a * b);
        }
    },
    "pow": {
        range: [2, 2],
        fn: (a, b) => Math.pow(a, b)
    },
    "div": {
        range: [2, 2],
        fn: (a, b) => b !== 0 ? a / b : new Error("divide by zero")
    },
    "idiv": {
        range: [2, 2],
        fn: (a, b) => b !== 0 ? Math.floor(a / b) : new Error("divide by zero")
    },
    "mod": {
        range: [2, 2],
        fn: (a, b) => a % b
    },

    "and": {
        range: [2, Infinity],
        fn: function () {
            return [~0, ...arguments].reduce((a, b) => a & b);
        }
    },
    "or": {
        range: [2, Infinity],
        fn: function () {
            return [0, ...arguments].reduce((a, b) => a | b);
        }
    },
    "xor": {
        range: [2, 2],
        fn: (a, b) => a ^ b
    },
    "not": {
        range: [1, 1],
        fn: a => ~a
    },

    "round": {
        range: [1, 1],
        fn: a => Math.round(a)
    },
    "floor": {
        range: [1, 1],
        fn: a => Math.floor(a)
    },
    "ceil": {
        range: [1, 1],
        fn: a => Math.ceil(a)
    },

    "max": {
        range: [2, Infinity],
        fn: function () {
            return Math.max(...arguments);
        }
    },
    "min": {
        range: [2, Infinity],
        fn: function () {
            return Math.min(...arguments);
        }
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
    const operation = _this.execItem(dataRaw[0]);
    const valsRaw = dataRaw.slice(1);
    let operationRef = null;
    let vals;
    let result;

    if (operations.has(operation)) {
        operationRef = operations.get(operation);
    } else if (aliases.has(operation)) {
        operationRef = operations.get(aliases.get(operation));
    } else {
        return new Error("invalid operation");
    }

    if (valsRaw.length >= operationRef.range[0] && valsRaw.length <= operationRef.range[1]) {
        vals = _this.execArr(valsRaw);
    } else {
        return new Error("invalid args");
    }

    if (vals.some(val => !isDecimal(val))) {
        return new Error("args must be numbers");
    } else {
        vals = vals.map(toDecimal);
    }

    result = operationRef.fn(...vals);

    if (result > MAX) {
        return new Error("inf");
    } else if (result < MIN) {
        return new Error("-inf");
    } else {
        return result;
    }
};
