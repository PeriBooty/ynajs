import { forEachEntry } from "lightdash";
import { utc } from "moment";
import { ynaKeyMap } from "../types";
import { toDatetime } from "../types/datetime";

const initKeys = (args: string[], ctx: object): ynaKeyMap => {
    const map: ynaKeyMap = new Map();

    map.set("time", toDatetime(utc()));
    map.set("newrep", false);

    // Args
    map.set("args", args.join(" "));
    map.set("arglen", args.length);
    args.forEach((arg, index) => {
        map.set(`arg${index + 1}`, arg);
    });

    // Context
    forEachEntry(ctx, (key, val) => {
        map.set(key, val);
    });

    return map;
};

export default initKeys;
