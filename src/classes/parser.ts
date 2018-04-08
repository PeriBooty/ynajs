import { ynaControlData, ynaControlTree, ynaIds } from "../enums";
import {
    IYnaData,
    IYnaOptions,
    IYnaParser,
    IYnaParserIsControlTree,
    IYnaTree,
    IYnaTreeBlockResult
} from "../interfaces";
import { ynaParserIterator, ynaTree } from "../types";
import YnaLogger from "./logger";
import { stringifyError } from "../util/stringify";

const iterateString = (str: string, fn: ynaParserIterator): number => {
    let strStack = 0;

    str.split("").forEach((letter, strIndex) => {
        const isControlTree: IYnaParserIsControlTree = {
            open: letter === ynaControlTree.open,
            close: letter === ynaControlTree.close
        };

        if (isControlTree.open) {
            strStack++;
        } else if (isControlTree.close) {
            strStack--;
        }

        fn(letter, strIndex, strStack, isControlTree);
    });

    return strStack;
};

const YnaParser = class extends YnaLogger implements IYnaParser {
    constructor(options: IYnaOptions, data: IYnaData) {
        super("PARSER", options, data);
    }
    public parseString(str: string, stripEmpty: boolean = true): ynaTree {
        const strData: IYnaTree = [];
        let strIndexLast = 0;
        let result: string | ynaTree;
        let resultType: string;
        const strStackEnd = iterateString(
            str,
            (letter, strIndex, strStack, isControlTree) => {
                const currentString = str.substr(
                    strIndexLast,
                    strIndex - strIndexLast
                );

                if (isControlTree.open && strStack === 1) {
                    /**
                     * If a block has been entered, push the previous string to the container
                     */
                    strData.push(currentString);
                    strIndexLast = strIndex;
                } else if (isControlTree.close && strStack === 0) {
                    /**
                     * If a block has been exited, evaluate the content and push to the container
                     */
                    strData.push(
                        this.parseBlock(
                            currentString.substr(1, currentString.length - 1)
                        )
                    );
                    strIndexLast = strIndex + 1;
                }
            }
        );

        strData.push(str.substr(strIndexLast));

        /**
         * If strStack is not zero, there are unmatched brackets
         */
        if (strStackEnd !== 0) {
            result = stringifyError("parser", new Error("mismatched brackets"));
            resultType = "error";
        } else {
            /**
             * Remove empty entries while not in stripEmpty mode
             */
            const dataFiltered = stripEmpty
                ? strData.filter(item => item.length > 0)
                : strData;

            /**
             * If the result is a single-item array, return the item directly
             */
            if (dataFiltered.length === 1) {
                result = dataFiltered[0];
                resultType = "single";
            } else {
                result = dataFiltered;
                resultType = "mixed";
            }
        }

        this.log(["string", resultType], result);

        return result;
    }
    public parseBlock(str: string): ynaTree {
        const strTrimmed = str.trim();
        let result: ynaTree;
        let resultType: string;

        /**
         * Flow:
         * Is comment -> return empty
         * Is escaped -> return string
         * Is command -> recurse into parseString and return command object
         * Is key -> return key object
         */
        if (strTrimmed.startsWith(ynaControlData.comment)) {
            /**
             * Comment
             */
            const commentText =
                ynaControlTree.open +
                str.replace(ynaControlData.comment, "") +
                ynaControlTree.close;

            result = [ynaIds.comment, commentText];
            resultType = "comment";
        } else if (strTrimmed.startsWith(ynaControlData.escape)) {
            /**
             * Escaped
             */
            const escapedText =
                ynaControlTree.open +
                str.replace(ynaControlData.escape, "") +
                ynaControlTree.close;

            result = escapedText;
            resultType = "escaped";
        } else if (strTrimmed.endsWith(ynaControlData.delimiter)) {
            /**
             * Command
             */
            const parsedCommand = this.parseBlockData(str);

            result = [ynaIds.command, parsedCommand.name, parsedCommand.args];
            resultType = "command";
        } else {
            /**
             * Key
             */
            const parsedKey = this.parseString(str);

            result = [ynaIds.key, parsedKey];
            resultType = "key";
        }

        this.log(["block", resultType], result);

        return result;
    }
    public parseBlockData(str: string): IYnaTreeBlockResult {
        const strData: ynaTree = [];
        const result: IYnaTreeBlockResult = {
            name: "",
            args: ""
        };
        let resultType: string;
        let strIndexLast = 0;
        let encounteredStart = false;
        const strStackEnd = iterateString(str, (letter, strIndex, strStack) => {
            if (
                strStack === 0 &&
                (letter === ynaControlData.delimiter ||
                    (letter === ynaControlData.start && !encounteredStart))
            ) {
                const currentBlock = this.parseString(
                    str.substr(strIndexLast, strIndex - strIndexLast),
                    true
                );

                strData.push(currentBlock);
                strIndexLast = strIndex + 1;

                // Only use the first data-start, ignore after
                if (letter === ynaControlData.start) {
                    encounteredStart = true;
                }
            }
        });

        /**
         * If strStack is not zero, there are unmatched brackets
         */
        if (strStackEnd !== 0) {
            result.name = <ynaTree>strData[0];
            result.args = stringifyError(
                "parser",
                new Error("mismatched brackets")
            );
            resultType = "error";
        } else {
            result.name = <ynaTree>strData[0];
            result.args = strData.slice(1);
            resultType = "mixed";
        }

        this.log(["strData", resultType], result);

        return result;
    }
};

export default YnaParser;
