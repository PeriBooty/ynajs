import { mapFromObject } from "lightdash";
import { MATH_MAX, MATH_MIN } from "../../constants";
import { IYnaMathDef, IYnaTree } from "../../interfaces";
import {
    ynaAliasMap,
    ynaCommand,
    ynaCommandResult,
    ynaMathMap
} from "../../types";
import { isDecimal, toDecimal } from "../../types/decimal";

// tslint:disable:no-bitwise
const operations: ynaMathMap = mapFromObject({
    add: {
        argsLengthRange: [2, Infinity],
        fn: (...args: number[]) => args.reduce((a, b) => a + b)
    },
    sub: {
        argsLengthRange: [2, 2],
        fn: (...args: number[]) => args.reduce((a, b) => a - b)
    },
    mul: {
        argsLengthRange: [2, Infinity],
        fn: (...args: number[]) => args.reduce((a, b) => a * b)
    },
    pow: {
        argsLengthRange: [2, 2],
        fn: Math.pow
    },
    div: {
        argsLengthRange: [2, 2],
        fn: (a: number, b: number) =>
            b !== 0 ? a / b : new Error("divide by zero")
    },
    idiv: {
        argsLengthRange: [2, 2],
        fn: (a: number, b: number) =>
            b !== 0 ? Math.floor(a / b) : new Error("divide by zero")
    },
    mod: {
        argsLengthRange: [2, 2],
        fn: (a: number, b: number) => a % b
    },

    and: {
        argsLengthRange: [2, Infinity],
        fn: (...args: number[]) => [~0, ...args].reduce((a, b) => a & b)
    },
    or: {
        argsLengthRange: [2, Infinity],
        fn: (...args: number[]) => [0, ...args].reduce((a, b) => a | b)
    },
    xor: {
        argsLengthRange: [2, 2],
        fn: (a: number, b: number) => a ^ b
    },
    not: {
        argsLengthRange: [1, 1],
        fn: (a: number) => ~a
    },

    round: {
        argsLengthRange: [1, 1],
        fn: Math.round
    },
    floor: {
        argsLengthRange: [1, 1],
        fn: Math.floor
    },
    ceil: {
        argsLengthRange: [1, 1],
        fn: Math.ceil
    },

    max: {
        argsLengthRange: [2, Infinity],
        fn: Math.max
    },
    min: {
        argsLengthRange: [2, Infinity],
        fn: Math.min
    }
});

const aliases: ynaAliasMap = mapFromObject({
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

const commandMath: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no args");
    }

    const operation = runner.execItem(<IYnaTree>tree[0]);
    const valsRaw = tree.slice(1);
    let operationRef: IYnaMathDef;
    let vals: number[] | string[];
    let result: ynaCommandResult;

    if (operations.has(operation)) {
        operationRef = <IYnaMathDef>operations.get(operation);
    } else if (aliases.has(operation)) {
        operationRef = <IYnaMathDef>(
            operations.get(<string>aliases.get(operation))
        );
    } else {
        return new Error("unknown operation");
    }

    if (
        valsRaw.length >= operationRef.argsLengthRange[0] &&
        valsRaw.length <= operationRef.argsLengthRange[1]
    ) {
        vals = <string[]>runner.execArr(valsRaw);
    } else {
        return new Error("invalid args");
    }

    if (vals.some(val => !isDecimal(val))) {
        return new Error("non-number args");
    }

    vals = vals.map(toDecimal);
    result = operationRef.fn(...vals);

    if (result > MATH_MAX) {
        return new Error("inf");
    } else if (result < MATH_MIN) {
        return new Error("-inf");
    }

    return result;
};

export { commandMath };
