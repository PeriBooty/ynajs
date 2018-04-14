import { randNumber } from "lightdash";
import { isNumber } from "../../types/number";
import { ynaCommand } from "../../types";

const commandRandomNum: ynaCommand = (runner, tree) => {
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
    } else if (data.length > 1) {
        min = toNumber(data[0]);
        max = toNumber(data[1]);
    }

    if (data.length === 3) {
        step = toNumber(data[2]);
    }

    if (min === max || step === 0) {
        return new Error("invalid range");
    }

    return String(Math.floor(randNumber(min, max, false) / step) * step);
};

export default commandRandomNum;
