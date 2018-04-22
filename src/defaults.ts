import { IYnaData, IYnaOptions, IYnaRunnerOptions } from "./interfaces";

const optionsDefault: IYnaOptions = {
    debug: false,
    loadJSON: false
};

const optionsRunnerDefault: IYnaRunnerOptions = {
    debug: false
};

const dataDefault: IYnaData = {};

export { dataDefault, optionsDefault, optionsRunnerDefault };
