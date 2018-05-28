import { MAX_RECURSION_DEPTH } from "../../constants";
import { IYnaTree } from "../../interfaces";
import { ynaCommand, ynaKeyMap } from "../../types";
import { isKey } from "../../types/key";
import { toList } from "../../types/list";
import { escapeKeyVal } from "../../util/escapeKeyVal";

const commandFunc: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no args");
    } else if (tree.length < 2) {
        return new Error("invalid args");
    }
    const key = runner.execItem(<IYnaTree>tree[0]);

    if (!isKey(key)) {
        return new Error("invalid key");
    }

    const fn = (keysNew?: ynaKeyMap) => {
        let result;

        runner.depth++;

        if (runner.depth > MAX_RECURSION_DEPTH) {
            return new Error("max recursion depth exceeded");
        }

        result = escapeKeyVal(
            runner.transformer(
                runner.execItem(<IYnaTree>tree[1], { keys: keysNew })
            )
        );
        runner.depth--;

        return result;
    };

    const commandFuncNested: ynaCommand = (subRunner, subTree) => {
        const args = subRunner.execItem(<IYnaTree>subTree);
        const argsParsed = toList(args);
        const keysNew = new Map(subRunner.keys);

        keysNew.set("targs", args);
        keysNew.set("targlen", argsParsed.length);
        argsParsed.forEach((arg, index) => {
            keysNew.set(`ta${index + 1}`, arg);
        });

        return fn(keysNew);
    };

    runner.keys.set(key, fn);
    runner.commands.set(key, commandFuncNested);

    return "";
};

export { commandFunc };
