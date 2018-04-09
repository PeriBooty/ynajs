import { ynaControlData } from "../enums";

const toList = (str: string) => str => str.split(ynaControlData.list);
const isList = (str: string): boolean => str.includes(ynaControlData.list);

export { toList, isList };
