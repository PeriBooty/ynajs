import { IYnaParserIsControlTree, IYnaTree } from "./interfaces";

type ynaCommand = (...args: any[]) => any;

type ynaCommandMap = Map<string, ynaCommand>;
type ynaKeyMap = Map<string, string>;

type ynaTree = string | IYnaTree;

type ynaParserIterator = (
    letter: string,
    strIndex: number,
    strStack: number,
    isControlTree: IYnaParserIsControlTree
) => void;

export { ynaCommand, ynaCommandMap, ynaTree, ynaParserIterator, ynaKeyMap };
