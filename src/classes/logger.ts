import { IYnaData, IYnaLogger, IYnaOptions } from "../interfaces";

const YnaLogger = class implements IYnaLogger {
    public name: string;
    public options: IYnaOptions;
    public data: IYnaData;
    constructor(name: string, options: IYnaOptions, data: IYnaData) {
        this.name = name;
        this.options = options;
        this.data = data;
    }
    public log(arr: string[], contents: any): void {
        if (this.options.debug) {
            const path = [this.name, ...arr].join("::");

            // tslint:disable:no-console
            console.log(`${path}: ${JSON.stringify(contents)}`);
        }
    }
};

export { YnaLogger };
