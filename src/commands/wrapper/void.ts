import { IYnaTree } from "../../interfaces";
import { ynaCommand } from "../../types";

const _void: ynaCommand = (runner, tree) => {
    runner.execItem(<IYnaTree>tree[0]);

    return "";
};

export default _void;
