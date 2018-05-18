import { randNumber } from "lightdash";
import { ynaCommand } from "../../types";
import { isDecimal, toDecimal } from "../../types/decimal";

const num: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no args");
    }

    const data = runner.execArr(tree);

    if (!data.every(isDecimal)) {
        return new Error("invalid args");
    }

    let min = 0;
    let max = 100;
    let step = 1;

    if (data.length === 1) {
        max = toDecimal(data[0]);
    } else {
        min = toDecimal(data[0]);
        max = toDecimal(data[1]);
    }
    if (data.length === 3) {
        step = toDecimal(data[2]);
    }

    if (min === max || step === 0) {
        return new Error("invalid range");
    }

    const seed = randNumber(min, max, !Number.isInteger(step));

    return Math.floor(seed / step) * step;
};

export default num;
