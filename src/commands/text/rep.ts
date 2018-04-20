import { randItem } from "lightdash";
import { IYnaTree } from "../../interfaces";
import { ynaCommand } from "../../types";

const rep: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no content");
    } else if (tree.length !== 3) {
        return new Error("invalid args");
    }

    const data = runner.execArr(tree);
    const newrep = runner.keys.get("newrep");
    const needle = data[0];
    const haystack = newrep ? data[2] : data[1];
    const replacement = newrep ? data[1] : data[2];
    const regex = new RegExp(needle, "g");

    return haystack.replace(regex, replacement);
};

export default rep;