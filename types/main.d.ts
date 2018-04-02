/**
 * YNA instance class
 *
 * @class
 */
declare const Yna: {
    new (yna: string, options?: object, data?: object): {
        tree: any;
        commands: Map<string, (...args: any[]) => any>;
        keys: any;
        addCommand(name: string, fn: any): void;
        run(args?: any[], ctx?: object, options?: object, data?: object): string;
    };
};
export default Yna;
