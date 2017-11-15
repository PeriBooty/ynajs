"use strict";

const LANGUAGE_YNA = require("./language");
const CONTROL_TREE = LANGUAGE_YNA.control.tree;
const CONTROL_DATA = LANGUAGE_YNA.control.data;
const IDS = LANGUAGE_YNA.ids;

const YnaBase = require("./base");
const stringifyError = require("./util/stringifyError");


/**
 * Parser class
 *
 * @class
 */
module.exports = class extends YnaBase {
    /**
     * Parser constructor
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
     * @returns {string|Array<any>}
     */
    parseString(str, stripEmpty = true) {
        const strData = [];
        let strStack = 0;
        let strIndex = 0;
        let strIndexLast = 0;
        let result;
        let resultType;

        /**
         * Flow:
         * Is "{" -> increase strStack and push part if strStack === 1
         * Is "}" -> decrease strStack and push part if strStack === 0
         * Else return string
         */
        while (strIndex < str.length) {
            const letter = str[strIndex];

            /**
             * Tree opening/closing
             */
            if (letter === CONTROL_TREE.open || letter === CONTROL_TREE.close) {
                const currentString = str.substr(strIndexLast, strIndex - strIndexLast);

                strStack += letter === CONTROL_TREE.open ? 1 : -1; // Increase or decrease the strStack based on tree block

                /**
                 * If a block has been entered, push the previous string to the container
                 */
                if (letter === CONTROL_TREE.open && strStack === 1) {
                    strData.push(currentString);
                    strIndexLast = strIndex;
                }

                /**
                 * If a block has been exited, evaluate the content and push to the container
                 */
                if (letter === CONTROL_TREE.close && strStack === 0) {
                    const currentBlock = this.parseBlock(currentString.substr(1, currentString.length - 1));

                    strData.push(currentBlock);
                    strIndexLast = strIndex + 1;
                }
            }

            strIndex++;
        }

        /**
         * Push remaining string to the container
         */
        strData.push(str.substr(strIndexLast, strIndex));

        /**
         * If strStack is not zero, there are unmatched brackets
         */
        if (strStack !== 0) {
            result = stringifyError("parser", new Error("mismatched brackets"));
            resultType = "error";
        } else {
            /**
             * Remove empty entries while not in stripEmpty mode
             */
            const dataFiltered = strData.filter(item => !stripEmpty || item.length !== 0);

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
            const commentText = CONTROL_TREE.open + str.replace(CONTROL_DATA.comment, "") + CONTROL_TREE.close;

            result = [IDS.comment, commentText];
            resultType = "comment";
        } else if (strTrimmed.startsWith(CONTROL_DATA.escape)) {
            /**
             * Escaped
             */
            const escapedText = CONTROL_TREE.open + str.replace(CONTROL_DATA.escape, "") + CONTROL_TREE.close;

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
        let strStack = 0;
        let strIndex = 0;
        let strIndexLast = 0;
        let encounteredDataStart = false;

        /**
         * Flow:
         * Is "{" -> increase strStack and push part if strStack === 1
         * Is "}" -> decrease strStack and push part if strStack === 0
         * Else return string
         */
        while (strIndex < str.length) {
            const letter = str[strIndex];

            /**
             * Tree opening/closing
             */
            if (letter === CONTROL_TREE.open || letter === CONTROL_TREE.close) {
                /**
                 *  Increase/Decrease strStack based on open/close control
                 */
                strStack += letter === CONTROL_TREE.open ? 1 : -1;
            }

            if (strStack === 0 && (letter === CONTROL_DATA.delimiter || (letter === CONTROL_DATA.start && !encounteredDataStart))) {
                const currentString = str.substr(strIndexLast, strIndex - strIndexLast);
                const currentBlock = this.parseString(currentString, true);

                strData.push(currentBlock);
                strIndexLast = strIndex + 1;

                //Only use the first data-start, ignore after
                if (letter === CONTROL_DATA.start) {
                    encounteredDataStart = true;
                }
            }

            strIndex++;
        }

        /**
         * If strStack is not zero, there are unmatched brackets
         */
        if (strStack !== 0) {
            result.name = strData[0];
            result.args = stringifyError("parser", new Error("mismatched brackets"));
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
