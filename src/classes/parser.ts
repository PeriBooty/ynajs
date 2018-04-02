"use strict";

const LANGUAGE_YNA = require("./language");
const CONTROL_TREE = LANGUAGE_YNA.control.tree;
const CONTROL_DATA = LANGUAGE_YNA.control.data;
const IDS = LANGUAGE_YNA.ids;

const YnaLogger = require("./logger");
const { stringifyError } = require("./types/stringify");

/**
 * Iterates over a string and returns exit stack size
 *
 * @param {string} str
 * @param {Function} fn
 * @returns {number}
 */
const iterateString = (str, fn) => {
    let strStack = 0;

    str.split("").forEach((letter, strIndex) => {
        const isControlTree = {
            open: letter === CONTROL_TREE.open,
            close: letter === CONTROL_TREE.close
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

/**
 * YnaParser class
 *
 * @class
 * @extends YnaLogger
 */
module.exports = class extends YnaLogger {
    /**
     * YnaParser constructor
     *
     * @constructor
     * @param {Object} options
     * @param {Object} data
     */
    constructor(options, data) {
        super("PARSER", options, data);
    }
    /**
     * Parses string into strings/block array
     *
     * @param {string} str
     * @param {boolean} [stripEmpty=true]
     * @returns {string|Array<any>}
     */
    parseString(str, stripEmpty = true) {
        const strData = [];
        let strIndexLast = 0;
        let result;
        let resultType;
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
                    const blockContent = this.parseBlock(
                        currentString.substr(1, currentString.length - 1)
                    );

                    strData.push(blockContent);
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
    /**
     * parses block-string into block-array
     *
     * @param {string} str
     * @returns {Array<any>}
     */
    parseBlock(str) {
        const strTrimmed = str.trim();
        let result;
        let resultType;

        /**
         * Flow:
         * Is comment -> return empty
         * Is escaped -> return string
         * Is command -> recurse into parseString and return command object
         * Is key -> return key object
         */
        if (strTrimmed.startsWith(CONTROL_DATA.comment)) {
            /**
             * Comment
             */
            const commentText =
                CONTROL_TREE.open +
                str.replace(CONTROL_DATA.comment, "") +
                CONTROL_TREE.close;

            result = [IDS.comment, commentText];
            resultType = "comment";
        } else if (strTrimmed.startsWith(CONTROL_DATA.escape)) {
            /**
             * Escaped
             */
            const escapedText =
                CONTROL_TREE.open +
                str.replace(CONTROL_DATA.escape, "") +
                CONTROL_TREE.close;

            result = escapedText;
            resultType = "escaped";
        } else if (strTrimmed.endsWith(CONTROL_DATA.delimiter)) {
            /**
             * Command
             */
            const parsedCommand = this.parseBlockData(str);

            result = [IDS.command, parsedCommand.name, parsedCommand.args];
            resultType = "command";
        } else {
            /**
             * Key
             */
            const parsedKey = this.parseString(str);

            result = [IDS.key, parsedKey];
            resultType = "key";
        }

        this.log(["block", resultType], result);

        return result;
    }
    parseBlockData(str) {
        const strData = [];
        const result = {
            name: [],
            args: []
        };
        let resultType;
        let strIndexLast = 0;
        let encounteredStart = false;
        const strStackEnd = iterateString(str, (letter, strIndex, strStack) => {
            const letterIsStart =
                letter === CONTROL_DATA.start && !encounteredStart;

            if (
                strStack === 0 &&
                (letter === CONTROL_DATA.delimiter || letterIsStart)
            ) {
                const currentString = str.substr(
                    strIndexLast,
                    strIndex - strIndexLast
                );
                const currentBlock = this.parseString(currentString, true);

                strData.push(currentBlock);
                strIndexLast = strIndex + 1;

                // Only use the first data-start, ignore after
                if (letter === CONTROL_DATA.start) {
                    encounteredStart = true;
                }
            }
        });

        /**
         * If strStack is not zero, there are unmatched brackets
         */
        if (strStackEnd !== 0) {
            result.name = strData[0];
            result.args = stringifyError(
                "parser",
                new Error("mismatched brackets")
            );
            resultType = "error";
        } else {
            result.name = strData[0];
            result.args = strData.slice(1);
            resultType = "mixed";
        }

        this.log(["strData", resultType], result);

        return result;
    }
};
