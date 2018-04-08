import { objDefaults, objDefaultsDeep } from "lightdash";
import YnaParser from "./classes/parser";
import { dataDefault, optionsDefault, optionsRunnerDefault } from "./defaults";
import initCommands from "./init/initCommands";
import { IYna, IYnaData, IYnaOptions, IYnaRunnerOptions } from "./interfaces";
import { ynaCommandFnMap, ynaTree, ynaCommandFn } from "./types";

const Yna = class {
    public tree: string | ynaTree;
    public commands: ynaCommandFnMap;
    public keys: any;
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
        if (optionsMerged.loadJSON) {
            this.tree = yna;
        } else {
            this.tree = new YnaParser(optionsMerged, dataMerged).parseString(
                <string>yna
            );
        }
    }
    public addCommand(name: string, fn: ynaCommandFn): void {
        this.commands.set(name, fn);
    }
    public run(
        args: any[] = [],
        ctx: object = {},
        options: object = {},
        data: object = {}
    ): string {
        /*         const optionsMerged = objDefaultsDeep(options, optionsRunnerDefault);
        const dataMerged = objDefaults(data, dataDefault);
        const keyMap = initKeys(args, ctx);
        const runner = new YnaRunner(
            this.commandMap,
            keyMap,
            optionsMerged,
            dataMerged
        );

        return runner.execItem(this.tree); */
        return "";
    }
};

export default Yna;
