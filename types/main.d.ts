import { ynaCommand, ynaTree } from "./types";
/**
 * Yna Class
 *
 * @public
 * @class
 */
declare const Yna: {
    new (yna: ynaTree, options?: object, data?: object): {
        tree: ynaTree;
        commands: Map<string, ynaCommand>;
        /**
         * Registers a new command to the command map
         *
         * @public
         * @param {string} name
         * @param {ynaCommand} fn
         */
        addCommand(name: string, fn: ynaCommand): void;
        /**
         * Executes yna command and returns result
         *
         * @public
         * @param {string[]} args
         * @param {object} ctx
         * @param {object} options
         * @param {object} data
         * @returns {string}
         */
        run(args?: string[], ctx?: object, options?: object, data?: object): string;
    };
};
export default Yna;
