import { isObject, objDefaults, objDefaultsDeep } from "lightdash";
import YnaParser from "./classes/parser";
import YnaRunner from "./classes/runner";
import { dataDefault, optionsDefault } from "./defaults";
import initCommands from "./init/initCommands";
import initKeys from "./init/initKeys";
import { IYna, IYnaData, IYnaOptions } from "./interfaces";
import { ynaCommand, ynaCommandMap, ynaKeyMap, ynaTree } from "./types";

const Yna = class {
    public tree: string | ynaTree;
    public commands: ynaCommandMap;
    constructor(
        yna: string | ynaTree,
        options: object = {},
        data: object = {}
    ) {
        const optionsMerged = <IYnaOptions>objDefaultsDeep(
            options,
            optionsDefault
        );
        const dataMerged = <IYnaData>objDefaultsDeep(data, dataDefault);

        this.commands = initCommands();
        if (isObject(yna)) {
            this.tree = yna;
        } else {
            this.tree = new YnaParser(optionsMerged, dataMerged).parseString(
                <string>yna
            );
        }
    }
    public addCommand(name: string, fn: ynaCommand): void {
        this.commands.set(name, fn);
    }
    public run(
        args: string[] = [],
        ctx: object = {},
        options: object = {},
        data: object = {}
    ): string {
        const optionsMerged = <IYnaOptions>objDefaultsDeep(
            options,
            optionsDefault
        );
        const dataMerged = <IYnaData>objDefaults(data, dataDefault);
        const keyMap = initKeys(args, ctx);

        return new YnaRunner(
            this.commands,
            keyMap,
            optionsMerged,
            dataMerged
        ).execItem(this.tree);
    }
};

export default Yna;
