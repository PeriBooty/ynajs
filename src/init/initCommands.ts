import { mapFromObject } from "lightdash";
import { ynaCommandFn, ynaCommandFnMap } from "../types";

const initCommands = (): ynaCommandFnMap => {
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
        /*         num,
        choose,
        wchoose, */

        /**
         * Wrappers
         */
        /*   oneline,
        void: _void */

        foo: () => "foo"
    });

    // Conditional registers here

    return map;
};

export default initCommands;
