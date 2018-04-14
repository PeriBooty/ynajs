import { randNumber } from "lightdash";
import { isNumber, toNumber } from "../../types/number";
import { ynaCommand } from "../../types";

const num: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no args");
    }

    const data = runner.execArr(tree);

    if (!data.every(isNumber)) {
        return new Error("invalid args");
    }

    let min = 0;
    let max = 100;
    let step = 1;

    if (data.length === 1) {
        max = toNumber(data[0]);
    } else {
        min = toNumber(data[0]);
        max = toNumber(data[1]);
    }
    if (data.length === 3) {
        step = toNumber(data[2]);
    }

    if (min === max || step === 0) {
        return new Error("invalid range");
    }

    const seed = randNumber(min, max, !Number.isInteger(step));

    return Math.floor(seed / step) * step;
};

export default num;
