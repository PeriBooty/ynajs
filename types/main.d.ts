import { ynaTree, ynaCommandFn } from "./types";
declare const Yna: {
    new (yna: ynaTree, options?: object, data?: object): {
        tree: ynaTree;
        commands: Map<string, ynaCommandFn>;
        keys: any;
        addCommand(name: string, fn: ynaCommandFn): void;
        run(args?: any[], ctx?: object, options?: object, data?: object): string;
    };
};
export default Yna;
