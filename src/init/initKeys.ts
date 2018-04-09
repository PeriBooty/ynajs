import { forEachEntry } from "lightdash";
import { ynaKeyMap } from "../types";
/* const moment = require("moment");
const toDatetime = require("../types/toDatetime"); */

/**
 * Creates map of default keys
 *
 * @param {Array<string>} args
 * @param {Object} ctx
 * @returns {Map}
 */
const initKeys = (args: string[], ctx: object): ynaKeyMap => {
    const map: ynaKeyMap = new Map();
    /*     const time = toDatetime(moment(Date.now()).utc());

    map.set("time", time);
    map.set("newrep", false); */

    // Args
    map.set("args", args.join(" "));
    map.set("arglen", String(args.length));
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
