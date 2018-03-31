"use strict";

const { mapFromObject } = require("lightdash");
const isNumber = require("../../types/isNumber");
const isWord = require("../../types/isWord");
const isLetter = require("../../types/isLetter");
const isDecimal = require("../../types/isDecimal");
const isError = require("../../types/isError");
const isList = require("../../types/isList");
const toNumber = require("../../types/toNumber");
const toList = require("../../types/toList");

const types = mapFromObject({
    word: isWord,
    letter: isLetter,
    number: isNumber,
    decimal: isDecimal,
    error: isError
});

const operations = mapFromObject({
    eq: {
        type: "any",
        fn: (a, b) => a === b
    },
    ne: {
        type: "any",
        fn: (a, b) => a !== b
    },
    gt: {
        type: "number",
        fn: (a, b) => a > b
    },
    ge: {
        type: "number",
        fn: (a, b) => a >= b
    },
    lt: {
        type: "number",
        fn: (a, b) => a < b
    },
    le: {
        type: "number",
        fn: (a, b) => a <= b
    },
    in: {
        type: "any",
        fn: (a, b) => {
            const bParsed = isList(b) ? toList(b) : b;

            return bParsed.includes(a);
        }
    },
    is: {
        type: "any",
        fn: (a, b) => {
            const typeFn = types.get(b);

            return typeFn(a);
        }
    }
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

/**
 * when command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
 */
module.exports = function(dataRaw) {
    if (dataRaw.length < 4 || dataRaw.length > 5) {
        return new Error("invalid args");
    }

    const op = this.execItem(dataRaw[1]);
    let val1 = this.execItem(dataRaw[0]);
    let val2 = this.execItem(dataRaw[2]);
    const onTrue = () => this.execItem(dataRaw[3]);
    const onFalse = dataRaw[4] ? () => this.execItem(dataRaw[4]) : () => {};
    let opRef = null;

    if (operations.has(op)) {
        opRef = operations.get(op);
    } else if (aliases.has(op)) {
        opRef = operations.get(aliases.get(op));
    } else {
        return new Error("invalid op");
    }

    //For number-only operations
    if (opRef.type === "number") {
        if (!isNumber(val1) || !isNumber(val2)) {
            return new Error("args must be numbers");
        }

        val1 = toNumber(val1);
        val2 = toNumber(val2);
    }

    //For type lookup
    if (op === "is") {
        if (!types.has(val2)) {
            return new Error("invalid type name");
        }
    }

    return opRef.fn(val1, val2) ? onTrue() : onFalse();
};
