import { mapFromObject } from "lightdash";
import func from "../commands/data/func";
import set from "../commands/data/set";
import time from "../commands/data/time";
import when from "../commands/logic/when";
import math from "../commands/numbers/math";
import choose from "../commands/random/choose";
import num from "../commands/random/num";
import wchoose from "../commands/random/wchoose";
import len from "../commands/text/len";
import lower from "../commands/text/lower";
import parse from "../commands/text/parse";
import rep from "../commands/text/rep";
import slice from "../commands/text/slice";
import title from "../commands/text/title";
import upper from "../commands/text/upper";
import oneline from "../commands/wrapper/oneline";
import _void from "../commands/wrapper/void";
import { ynaCommand, ynaCommandMap } from "../types";

const initCommands = (): ynaCommandMap => {
    const map = mapFromObject({
        /**
         * Data
         */
        set,
        func,
        time,

        /**
         * Logic
         */
        when,
        /**
         * Numbers
         */
        math,
        /**
         * Text
         */
        len,
        upper,
        lower,
        title,
        rep,
        parse,
        slice,
        /**
         * Random
         */
        num,
        choose,
        wchoose,
        /**
         * Wrappers
         */
        oneline,
        void: _void
    });

    // Conditional registers here

    return map;
};

export default initCommands;
