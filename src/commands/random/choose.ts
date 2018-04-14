import { randItem } from "lightdash";
import { ynaCommand } from "../../types";

const commandRandomChoose: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no options");
    }

    const options = runner.execArr(tree);

    return randItem(options);
};

export default commandRandomChoose;
