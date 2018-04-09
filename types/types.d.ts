import { IYnaParserIsControlTree, IYnaTree, IYnaRunner } from "./interfaces";
declare type ynaCommand = (runner: IYnaRunner, tree: IYnaTree) => string;
declare type ynaCommandTransformer = (str: string) => string;
declare type ynaCommandMap = Map<string, ynaCommand>;
declare type ynaKeyMap = Map<string, any>;
declare type ynaTreeItems = string | number | IYnaTree;
declare type ynaTree = string | IYnaTree;
declare type ynaParserIterator = (letter: string, strIndex: number, strStack: number, isControlTree: IYnaParserIsControlTree) => void;
export { ynaCommand, ynaCommandMap, ynaTree, ynaParserIterator, ynaKeyMap, ynaCommandTransformer, ynaTreeItems };
