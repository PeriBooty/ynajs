import { IYnaParserIsControlTree, IYnaTree } from "./interfaces";
declare type ynaCommand = (...args: any[]) => any;
declare type ynaCommandMap = Map<string, ynaCommand>;
declare type ynaKeyMap = Map<string, string>;
declare type ynaTree = string | IYnaTree;
declare type ynaParserIterator = (letter: string, strIndex: number, strStack: number, isControlTree: IYnaParserIsControlTree) => void;
export { ynaCommand, ynaCommandMap, ynaTree, ynaParserIterator, ynaKeyMap };
