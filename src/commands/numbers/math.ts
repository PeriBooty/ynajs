import { mapFromObject } from "lightdash";
import { isNumber, toNumber } from "../../types/number";
import { MATH_MAX, MATH_MIN } from "../../contants";
import {
    ynaAliasMap,
    ynaMathMap,
    ynaCommand,
    ynaCommandResult,
    ynaTreeItems
} from "../../types";
import { IYnaMathDef, IYnaTree } from "../../interfaces";

const operations: ynaMathMap = mapFromObject({
    add: <IYnaMathDef>{
        argsLengthRange: [2, Infinity],
        fn: (...args: number[]) => args.reduce((a, b) => a + b)
    },
    sub: <IYnaMathDef>{
        argsLengthRange: [2, 2],
        fn: (...args: number[]) => args.reduce((a, b) => a - b)
    },
    mul: <IYnaMathDef>{
        argsLengthRange: [2, Infinity],
        fn: (...args: number[]) => args.reduce((a, b) => a * b)
    },
    pow: <IYnaMathDef>{
        argsLengthRange: [2, 2],
        fn: Math.pow
    },
    div: <IYnaMathDef>{
        argsLengthRange: [2, 2],
        fn: (a, b) => (b !== 0 ? a / b : new Error("divide by zero"))
    },
    idiv: <IYnaMathDef>{
        argsLengthRange: [2, 2],
        fn: (a, b) =>
            b !== 0 ? Math.floor(a / b) : new Error("divide by zero")
    },
    mod: <IYnaMathDef>{
        argsLengthRange: [2, 2],
        fn: (a, b) => a % b
    },

    and: <IYnaMathDef>{
        argsLengthRange: [2, Infinity],
        fn: (...args: number[]) => [~0, ...args].reduce((a, b) => a & b)
    },
    or: <IYnaMathDef>{
        argsLengthRange: [2, Infinity],
        fn: (...args: number[]) => [0, ...args].reduce((a, b) => a | b)
    },
    xor: <IYnaMathDef>{
        argsLengthRange: [2, 2],
        fn: (a, b) => a ^ b
    },
    not: <IYnaMathDef>{
        argsLengthRange: [1, 1],
        fn: a => ~a
    },

    round: <IYnaMathDef>{
        argsLengthRange: [1, 1],
        fn: Math.round
    },
    floor: <IYnaMathDef>{
        argsLengthRange: [1, 1],
        fn: Math.floor
    },
    ceil: <IYnaMathDef>{
        argsLengthRange: [1, 1],
        fn: Math.ceil
    },

    max: <IYnaMathDef>{
        argsLengthRange: [2, Infinity],
        fn: Math.max
    },
    min: <IYnaMathDef>{
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

const math: ynaCommand = (runner, tree) => {
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
        operationRef = <IYnaMathDef>operations.get(<string>aliases.get(
            operation
        ));
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

    if (vals.some(val => !isNumber(val))) {
        return new Error("non-number args");
    }

    vals = vals.map(toNumber);
    result = operationRef.fn(...vals);

    if (result > MATH_MAX) {
        return new Error("inf");
    } else if (result < MATH_MIN) {
        return new Error("-inf");
    }

    return result;
};

export default math;
