import { IYnaTree } from "../../interfaces";
import { ynaCommand } from "../../types";

const commandParse: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no content");
    }

    const content = runner.execItem(<IYnaTree>tree[0]);

    return encodeURI(content);
};

export { commandParse };
