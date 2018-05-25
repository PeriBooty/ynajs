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

const initCommands = (): ynaCommandMap =>
    mapFromObject({
        set,
        func,
        time,

        when,

        math,

        len,
        upper,
        lower,
        title,
        rep,
        parse,
        slice,

        num,
        choose,
        wchoose,

        oneline,
        void: _void
    });

export default initCommands;
