import { IYnaParserIsControlTree, IYnaTree } from "./interfaces";
declare type ynaCommandFn = (...args: any[]) => any;
declare type ynaCommandFnMap = Map<string, ynaCommandFn>;
declare type ynaTree = string | IYnaTree;
declare type ynaParserIterator = (letter: string, strIndex: number, strStack: number, isControlTree: IYnaParserIsControlTree) => void;
export { ynaCommandFn, ynaCommandFnMap, ynaTree, ynaParserIterator };
