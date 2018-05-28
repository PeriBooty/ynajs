import { IYnaTree } from "../../interfaces";
import { ynaCommand } from "../../types";
import { isKey } from "../../types/key";
import { escapeKeyVal } from "../../util/escapeKeyVal";

const commandSet: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no args");
    } else if (tree.length !== 2) {
        return new Error("invalid args");
    }
    const data = runner.execArr(tree);
    const key = data[0];

    if (!isKey(key)) {
        return new Error("invalid key");
    }

    const val = escapeKeyVal(runner.transformer(data[1]));

    runner.keys.set(key, val);

    return "";
};

export { commandSet };
