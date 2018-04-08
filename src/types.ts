import { IYnaParserIsControlTree, IYnaTree } from "./interfaces";

type ynaCommandFn = (...args: any[]) => any;

type ynaCommandFnMap = Map<string, ynaCommandFn>;

type ynaTree = string | IYnaTree;

type ynaParserIterator = (
    letter: string,
    strIndex: number,
    strStack: number,
    isControlTree: IYnaParserIsControlTree
) => void;

export { ynaCommandFn, ynaCommandFnMap, ynaTree, ynaParserIterator };
