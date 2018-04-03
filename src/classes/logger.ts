import { IYnaLogger } from "../interfaces";

const YnaLogger = class implements IYnaLogger {
    public name: string;
    public options: any;
    public data: any;
    constructor(name: string, options: any, data: any) {
        this.name = name;
        this.options = options;
        this.data = data;
    }
    public log(arr: string[], data: any): void {
        if (this.options.debug) {
            const path = [this.name, ...arr].join("->");

            console.log(`${path}: ${JSON.stringify(data)}`);
        }
    }
};

export default YnaLogger;
