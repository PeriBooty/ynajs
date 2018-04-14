import { mapFromObject } from "lightdash";
import { ynaCommand, ynaCommandMap } from "../types";
import commandRandomNum from "../commands/random/num";
import commandRandomChoose from "../commands/random/choose";
import commandRandomWchoose from "../commands/random/wchoose";

const initCommands = (): ynaCommandMap => {
    const map = mapFromObject({
        /**
         * Data
         */
        /*         set,
        func,
        time,
 */
        /**
         * Logic
         */
        /*       when, */
        /**
         * Numbers
         */
        /*       math, */
        /**
         * Text
         */
        /*         len,
        upper,
        lower,
        title,
        rep,
        parse,
        slice, */
        /**
         * Random
         */
        num: commandRandomNum,
        choose: commandRandomChoose,
        wchoose: commandRandomWchoose
        /**
         * Wrappers
         */
        /*   oneline,
        void: _void */
    });

    // Conditional registers here

    return map;
};

export default initCommands;
