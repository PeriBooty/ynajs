import { mapFromObject } from "lightdash";
import { commandFunc } from "../commands/data/func";
import { commandSet } from "../commands/data/set";
import { commandTime } from "../commands/data/time";
import { commandWhen } from "../commands/logic/when";
import { commandMath } from "../commands/numbers/math";
import { commandChoose } from "../commands/random/choose";
import { commandNum } from "../commands/random/num";
import { commandWchoose } from "../commands/random/wchoose";
import { commandLen } from "../commands/text/len";
import { commandLower } from "../commands/text/lower";
import { commandParse } from "../commands/text/parse";
import { commandRep } from "../commands/text/rep";
import { commandSlice } from "../commands/text/slice";
import { commandTitle } from "../commands/text/title";
import { commandUpper } from "../commands/text/upper";
import { commandOneline } from "../commands/wrapper/oneline";
import { commandVoid } from "../commands/wrapper/void";
import { ynaCommand, ynaCommandMap } from "../types";

const initCommands = (): ynaCommandMap =>
    mapFromObject({
        set: commandSet,
        func: commandFunc,
        time: commandTime,

        when: commandWhen,

        math: commandMath,

        len: commandLen,
        upper: commandUpper,
        lower: commandLower,
        title: commandTitle,
        rep: commandRep,
        parse: commandParse,
        slice: commandSlice,

        num: commandNum,
        choose: commandChoose,
        wchoose: commandWchoose,

        oneline: commandOneline,
        void: commandVoid
    });

export { initCommands };
