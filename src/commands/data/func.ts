import { MAX_RECURSION_DEPTH } from "../../contants";
import { IYnaTree } from "../../interfaces";
import { ynaCommand } from "../../types";
import { isKey } from "../../types/key";
import escapeKeyVal from "../../util/escapeKeyVal";

const set: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no args");
    } else if (tree.length !== 2) {
        return new Error("invalid args");
    }
    const key = runner.execItem(<IYnaTree>tree[0]);

    if (!isKey(key)) {
        return new Error("invalid key");
    }

    // Evaluate value on fn call
    const fn = () => {
        let result;

        runner.depth++;

        if (runner.depth > MAX_RECURSION_DEPTH) {
            return new Error("max recursion depth exceeded");
        }

        result = escapeKeyVal(
            runner.transformer(runner.execItem(<IYnaTree>tree[1]))
        );
        runner.depth--;

        return result;
    };

    runner.keys.set(key, fn);

    return "";
};

export default set;
