"use strict";

const MATH_MAX = Math.pow(2, 32) - 1;
const MATH_MIN = -Math.pow(2, 32) + 1;

const { mapFromObject } = require("lightdash");
const isNumber = require("../../types/isNumber");
const toNumber = require("../../types/toNumber");

const operations = mapFromObject({
    add: {
        argsLengthRange: [2, Infinity],
        fn: function() {
            return Array.from(arguments).reduce((a, b) => a + b);
        }
    },
    sub: {
        argsLengthRange: [2, 2],
        fn: function() {
            return Array.from(arguments).reduce((a, b) => a - b);
        }
    },
    mul: {
        argsLengthRange: [2, Infinity],
        fn: function() {
            return Array.from(arguments).reduce((a, b) => a * b);
        }
    },
    pow: {
        argsLengthRange: [2, 2],
        fn: (a, b) => Math.pow(a, b)
    },
    div: {
        argsLengthRange: [2, 2],
        fn: (a, b) => (b !== 0 ? a / b : new Error("divide by zero"))
    },
    idiv: {
        argsLengthRange: [2, 2],
        fn: (a, b) =>
            b !== 0 ? Math.floor(a / b) : new Error("divide by zero")
    },
    mod: {
        argsLengthRange: [2, 2],
        fn: (a, b) => a % b
    },

    and: {
        argsLengthRange: [2, Infinity],
        fn: function() {
            return [~0, ...arguments].reduce((a, b) => a & b);
        }
    },
    or: {
        argsLengthRange: [2, Infinity],
        fn: function() {
            return [0, ...arguments].reduce((a, b) => a | b);
        }
    },
    xor: {
        argsLengthRange: [2, 2],
        fn: (a, b) => a ^ b
    },
    not: {
        argsLengthRange: [1, 1],
        fn: a => ~a
    },

    round: {
        argsLengthRange: [1, 1],
        fn: a => Math.round(a)
    },
    floor: {
        argsLengthRange: [1, 1],
        fn: a => Math.floor(a)
    },
    ceil: {
        argsLengthRange: [1, 1],
        fn: a => Math.ceil(a)
    },

    max: {
        argsLengthRange: [2, Infinity],
        fn: function() {
            return Math.max(...arguments);
        }
    },
    min: {
        argsLengthRange: [2, Infinity],
        fn: function() {
            return Math.min(...arguments);
        }
    }
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
    "~": "not"
});

/**
 * math command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
 */
module.exports = function(dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no args");
    }

    const operation = this.execItem(dataRaw[0]);
    const valsRaw = dataRaw.slice(1);
    let operationRef = null;
    let vals;
    let result;

    if (operations.has(operation)) {
        operationRef = operations.get(operation);
    } else if (aliases.has(operation)) {
        operationRef = operations.get(aliases.get(operation));
    } else {
        return new Error("unknown operation");
    }

    if (
        valsRaw.length >= operationRef.argsLengthRange[0] &&
        valsRaw.length <= operationRef.argsLengthRange[1]
    ) {
        vals = this.execArr(valsRaw);
    } else {
        return new Error("invalid args");
    }

    if (vals.some(val => !isNumber(val))) {
        return new Error("non-number args");
    }

    vals = vals.map(toNumber);
    result = operationRef.fn(...vals);

    if (result > MATH_MAX) {
        return new Error("inf");
    } else if (result < MATH_MIN) {
        return new Error("-inf");
    } else {
        return result;
    }
};
