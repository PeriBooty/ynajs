import { mapFromObject } from "lightdash";
import { IYnaTree, IYnaWhenDef } from "../../interfaces";
import {
    ynaAliasMap,
    ynaCommand,
    ynaTree,
    ynaTypeCheckFn,
    ynaWhenMap,
    ynaWhenTypeMap
} from "../../types";
import { isDecimal } from "../../types/decimal";
import { isError } from "../../types/error";
import { isLetter } from "../../types/letter";
import { isList, toList } from "../../types/list";
import { isNumber, toNumber } from "../../types/number";
import { isWord } from "../../types/word";

const types: ynaWhenTypeMap = mapFromObject({
    word: isWord,
    letter: isLetter,
    number: isNumber,
    decimal: isDecimal,
    error: isError
});

const operations: ynaWhenMap = mapFromObject({
    eq: {
        type: "any",
        fn: (a: any, b: any) => a === b
    },
    ne: {
        type: "any",
        fn: (a: any, b: any) => a !== b
    },
    gt: {
        type: "number",
        fn: (a: number, b: number) => a > b
    },
    ge: {
        type: "number",
        fn: (a: number, b: number) => a >= b
    },
    lt: {
        type: "number",
        fn: (a: number, b: number) => a < b
    },
    le: {
        type: "number",
        fn: (a: number, b: number) => a <= b
    },
    in: {
        type: "any",
        fn: (a: any, b: any) => {
            const bParsed = isList(b) ? toList(b) : b;

            return bParsed.includes(a);
        }
    },
    is: {
        type: "any",
        fn: (a: any, b: any) => {
            const typeFn = <ynaTypeCheckFn>types.get(b);

            return typeFn(a);
        }
    }
});

const aliases: ynaAliasMap = mapFromObject({
    "=": "eq",
    "==": "eq",
    "!=": "ne",
    "<>": "ne",
    ">=": "ge",
    ">": "gt",
    "<=": "le",
    "<": "lt"
});

const commandWhen: ynaCommand = (runner, tree) => {
    if (tree.length < 4 || tree.length > 5) {
        return new Error("invalid args");
    }

    let val1: string | number = runner.execItem(<ynaTree>tree[0]);
    let val2: string | number = runner.execItem(<ynaTree>tree[2]);
    const op = runner.execItem(<ynaTree>tree[1]);
    const onTrue = () => runner.execItem(<ynaTree>tree[3]);
    const onFalse = <ynaTree>tree[4]
        ? () => runner.execItem(<ynaTree>tree[4])
        : () => "";

    let opRef: IYnaWhenDef;

    if (operations.has(op)) {
        opRef = <IYnaWhenDef>operations.get(op);
    } else if (aliases.has(op)) {
        opRef = <IYnaWhenDef>operations.get(<string>aliases.get(op));
    } else {
        return new Error("invalid op");
    }

    if (opRef.type === "number") {
        if (!isNumber(val1) || !isNumber(val2)) {
            return new Error("args must be numbers");
        }

        val1 = toNumber(val1);
        val2 = toNumber(val2);
    } else if (op === "is") {
        if (!types.has(val2)) {
            return new Error("invalid type name");
        }
    }

    return opRef.fn(val1, val2) ? onTrue() : onFalse();
};

export { commandWhen };
