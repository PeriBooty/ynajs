import { randItem } from "lightdash";
import pyslice from "pyslice";
import { IYnaTree } from "../../interfaces";
import { ynaCommand } from "../../types";
import { isList, toList } from "../../types/list";
import { isNumber, toNumber } from "../../types/number";

const slice: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no args");
    } else if (tree.length !== 2) {
        return new Error("bad content");
    }

    const data = runner.execArr(tree);
    const content = data[1];
    const sliceInput = isList(data[0]) ? toList(data[0]) : [data[0]];

    if (sliceInput.length > 3) {
        return new Error("too many nums");
    } else if (!sliceInput.every(input => isNumber(input) || input === "")) {
        return new Error("non int index");
    }

    const sliceInputParsed = sliceInput.map(
        input => (input !== "" ? toNumber(input) : false)
    );

    if (sliceInputParsed[2] === 0) {
        return new Error("zero step");
    }

    if (sliceInputParsed[2] === false) {
        return pyslice(content, sliceInputParsed[0], sliceInputParsed[1]);
    } else {
        return pyslice(
            content,
            <number>sliceInputParsed[0],
            <number>sliceInputParsed[1],
            <number>sliceInputParsed[2]
        );
    }
};

export default slice;
