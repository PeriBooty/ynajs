import { IYnaData, IYnaOptions, IYnaRunnerOptions } from "./interfaces";

const optionsDefault: IYnaOptions = {
    debug: false,
    loadJSON: false
};

const optionsRunnerDefault: IYnaRunnerOptions = {
    debug: false,
    depth: 0 // Used for recursion depth checks
};

const dataDefault: IYnaData = {};

export { dataDefault, optionsDefault, optionsRunnerDefault };
