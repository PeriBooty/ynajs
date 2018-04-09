import { IYnaData, IYnaLogger, IYnaOptionsBase } from "../interfaces";

const YnaLogger = class implements IYnaLogger {
    public name: string;
    public options: IYnaOptionsBase;
    public data: IYnaData;
    constructor(name: string, options: IYnaOptionsBase, data: IYnaData) {
        this.name = name;
        this.options = options;
        this.data = data;
    }
    public log(arr: string[], contents: any): void {
        if (this.options.debug) {
            const path = [this.name, ...arr].join("::");

            console.log(`${path}: ${JSON.stringify(contents)}`);
        }
    }
};

export default YnaLogger;
