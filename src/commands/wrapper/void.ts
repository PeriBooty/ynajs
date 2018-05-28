import { IYnaTree } from "../../interfaces";
import { ynaCommand } from "../../types";

const commandVoid: ynaCommand = (runner, tree) => {
    runner.execItem(<IYnaTree>tree[0]);

    return "";
};

export { commandVoid };
