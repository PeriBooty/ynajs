import { forEachEntry } from "lightdash";
import { ynaKeyMap } from "../types";
import { toDatetime } from "../types/datetime";
import { utc } from "moment";

/**
 * Creates map of default keys
 *
 * @param {Array<string>} args
 * @param {Object} ctx
 * @returns {Map}
 */
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
    forEachEntry(ctx, (val, key) => {
        map.set(key, val);
    });

    return map;
};

export default initKeys;
