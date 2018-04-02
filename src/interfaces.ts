interface IYna {
    tree: any;
    commands: any;
    keys: any;
    constructor: (yna: string, options: object, data: object) => IYna;
    addCommand: (name: string, fn: any) => void;
    run: (args: any[], ctx: object, options: object, data: object) => string;
}

/* interface IYnaLogger {}

interface IYnaParser extends IYnaLogger {
    tree: any;
    commands: any;
    keys: any;
    addCommand: any;
    run: any;
} */

interface IYnaOptions {
    debug: boolean;
    loadJSON: boolean;
}

interface IYnaRunnerOptions {
    debug: boolean;
    depth: number;
}

interface IYnaData {
    [key: string]: any;
}

export { IYna, IYnaOptions, IYnaRunnerOptions, IYnaData };
