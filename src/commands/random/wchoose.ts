import { randItem } from "lightdash";
import { isNumber, toNumber } from "../../types/number";
import { ynaCommand } from "../../types";

const commandRandomWchoose: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no options");
    } else if (tree.length % 2 !== 0) {
        return new Error("mismatched weighting");
    }

    const data = runner.execArr(tree);
    const weights: number[] = [];
    const options: string[] = [];
    let areWeightsNumbers = true;

    data.forEach((item, index) => {
        if (index % 2 === 0) {
            options.push(item);
        } else {
            if (isNumber(item)) {
                weights.push(toNumber(item));
            } else {
                areWeightsNumbers = false;
            }
        }
    });
    if (!areWeightsNumbers) {
        return new Error("invalid weight");
    }

    const distributedValues: string[] = [];

    weights.forEach((weight, i) => {
        const value = options[i];
        const distributed: string[] = new Array(weight).fill(value);

        distributedValues.push(...distributed);
    });

    return randItem(distributedValues);
};

export default commandRandomWchoose;
