import { utc } from "moment";
import { IYnaTree } from "../../interfaces";
import { ynaCommand } from "../../types";
import { toNumber } from "../../types/number";
import { isNumberOffset } from "../../types/numberOffset";
import { toTime } from "../../types/time";

const commandTime: ynaCommand = (runner, tree) => {
    let currentTime = utc();
    const offset = tree[0] ? runner.execItem(<IYnaTree>tree[0]) : "0";

    if (!isNumberOffset(offset)) {
        return new Error("invalid offset");
    }

    const offsetNumber = toNumber(offset);
    const format = tree[1] ? runner.execItem(<IYnaTree>tree[1]) : "%H:%M";

    currentTime = currentTime.utcOffset(offsetNumber);

    return toTime(currentTime, format);
};

export { commandTime };
