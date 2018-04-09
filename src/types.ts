import { IYnaParserIsControlTree, IYnaTree } from "./interfaces";

type ynaCommand = (...args: any[]) => any;
type ynaCommandTransformer = (str: string) => string;

type ynaCommandMap = Map<string, ynaCommand>;
type ynaKeyMap = Map<string, any>;

type ynaTreeItems = string | number | IYnaTree;
type ynaTree = string | IYnaTree;

type ynaParserIterator = (
    letter: string,
    strIndex: number,
    strStack: number,
    isControlTree: IYnaParserIsControlTree
) => void;

export {
    ynaCommand,
    ynaCommandMap,
    ynaTree,
    ynaParserIterator,
    ynaKeyMap,
    ynaCommandTransformer,
    ynaTreeItems
};
