/**
 * YNA instance class
 *
 * @class
 */
declare const Yna: {
    new (yna: string, options?: object, data?: object): {
        addCommand(name: string, fn: any): void;
        run(args?: any[], ctx?: object, options?: object, data?: object): string;
    };
};
export default Yna;
