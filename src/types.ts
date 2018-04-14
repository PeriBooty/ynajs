import {
    IYnaParserIsControlTree,
    IYnaTree,
    IYnaData,
    IYnaRunner,
    IYnaMathDef
} from "./interfaces";

type ynaCommand = (runner: IYnaRunner, tree: IYnaTree) => ynaCommandResult;
type ynaCommandTransformer = (str: string) => string;
type ynaParserIterator = (
    letter: string,
    strIndex: number,
    strStack: number,
    isControlTree: IYnaParserIsControlTree
) => void;

type ynaCommandMap = Map<string, ynaCommand>;
type ynaKeyMap = Map<string, any>;
type ynaAliasMap = Map<string, string>;
type ynaMathMap = Map<string, IYnaMathDef>;

type ynaTreeItems = string | number | IYnaTree;
type ynaTree = string | IYnaTree;
type ynaCommandResult = any;

type ynaRange = [number, number];

export {
    ynaCommand,
    ynaCommandMap,
    ynaTree,
    ynaParserIterator,
    ynaKeyMap,
    ynaAliasMap,
    ynaCommandTransformer,
    ynaTreeItems,
    ynaRange,
    ynaCommandResult,
    ynaMathMap
};
