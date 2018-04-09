import { ynaTree, ynaCommand } from "./types";
declare const Yna: {
    new (yna: ynaTree, options?: object, data?: object): {
        tree: ynaTree;
        commands: Map<string, ynaCommand>;
        keys: any;
        addCommand(name: string, fn: ynaCommand): void;
        run(args?: string[], ctx?: object, options?: object, data?: object): string;
    };
};
export default Yna;
