import { IYnaParser } from "../interfaces";
import YnaLogger from "./logger";

const YnaParser = class extends YnaLogger implements IYnaParser {
    constructor(options: any, data: any) {
        super("parser", options, data);
    }
    public parseString(yna: string): void {}
};

export default YnaParser;
