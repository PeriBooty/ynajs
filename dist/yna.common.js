'use strict';

var lightdash = require('lightdash');

const YnaLogger = class {
    constructor(name, options, data) {
        this.name = name;
        this.options = options;
        this.data = data;
    }
    log(arr, contents) {
        if (this.options.debug) {
            const path = [this.name, ...arr].join("::");
            console.log(`${path}: ${JSON.stringify(contents)}`);
        }
    }
};

const stringifyError = (key, err) => `<${key}:${err.message}>`;

const iterateString = (str, fn) => {
    let strStack = 0;
    str.split("").forEach((letter, strIndex) => {
        const isControlTree = {
            open: letter === "{" /* open */,
            close: letter === "}" /* close */
        };
        if (isControlTree.open) {
            strStack++;
        }
        else if (isControlTree.close) {
            strStack--;
        }
        fn(letter, strIndex, strStack, isControlTree);
    });
    return strStack;
};
const YnaParser = class extends YnaLogger {
    constructor(options, data) {
        super("PARSER", options, data);
    }
    parseString(str, stripEmpty = true) {
        const strData = [];
        let strIndexLast = 0;
        let result;
        let resultType;
        const strStackEnd = iterateString(str, (letter, strIndex, strStack, isControlTree) => {
            const currentString = str.substr(strIndexLast, strIndex - strIndexLast);
            if (isControlTree.open && strStack === 1) {
                /**
                 * If a block has been entered, push the previous string to the container
                 */
                strData.push(currentString);
                strIndexLast = strIndex;
            }
            else if (isControlTree.close && strStack === 0) {
                /**
                 * If a block has been exited, evaluate the content and push to the container
                 */
                const blockContent = this.parseBlock(currentString.substr(1, currentString.length - 1));
                strData.push(blockContent);
                strIndexLast = strIndex + 1;
            }
        });
        strData.push(str.substr(strIndexLast));
        /**
         * If strStack is not zero, there are unmatched brackets
         */
        if (strStackEnd !== 0) {
            result = stringifyError("parser", new Error("mismatched brackets"));
            resultType = "error";
        }
        else {
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
            }
            else {
                result = dataFiltered;
                resultType = "mixed";
            }
        }
        this.log(["string", resultType], result);
        return result;
    }
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
        if (strTrimmed.startsWith("!" /* comment */)) {
            /**
             * Comment
             */
            const commentText = "{" /* open */ +
                str.replace("!" /* comment */, "") +
                "}" /* close */;
            result = [2 /* comment */, commentText];
            resultType = "comment";
        }
        else if (strTrimmed.startsWith(">" /* escape */)) {
            /**
             * Escaped
             */
            const escapedText = "{" /* open */ +
                str.replace(">" /* escape */, "") +
                "}" /* close */;
            result = escapedText;
            resultType = "escaped";
        }
        else if (strTrimmed.endsWith(";" /* delimiter */)) {
            /**
             * Command
             */
            const parsedCommand = this.parseBlockData(str);
            result = [1 /* command */, parsedCommand.name, parsedCommand.args];
            resultType = "command";
        }
        else {
            /**
             * Key
             */
            const parsedKey = this.parseString(str);
            result = [0 /* key */, parsedKey];
            resultType = "key";
        }
        this.log(["block", resultType], result);
        return result;
    }
    parseBlockData(str) {
        const strData = [];
        const result = {
            name: null,
            args: null
        };
        let resultType;
        let strIndexLast = 0;
        let encounteredStart = false;
        const strStackEnd = iterateString(str, (letter, strIndex, strStack) => {
            const letterIsStart = letter === ":" /* start */ && !encounteredStart;
            if (strStack === 0 &&
                (letter === ";" /* delimiter */ || letterIsStart)) {
                const currentString = str.substr(strIndexLast, strIndex - strIndexLast);
                const currentBlock = this.parseString(currentString, true);
                strData.push(currentBlock);
                strIndexLast = strIndex + 1;
                // Only use the first data-start, ignore after
                if (letter === ":" /* start */) {
                    encounteredStart = true;
                }
            }
        });
        /**
         * If strStack is not zero, there are unmatched brackets
         */
        if (strStackEnd !== 0) {
            result.name = strData[0];
            result.args = stringifyError("parser", new Error("mismatched brackets"));
            resultType = "error";
        }
        else {
            result.name = strData[0];
            result.args = strData.slice(1);
            resultType = "mixed";
        }
        this.log(["strData", resultType], result);
        return result;
    }
};

const optionsDefault = {
    debug: false,
    loadJSON: false
};
const dataDefault = {};

const initCommands = () => {
    const map = lightdash.mapFromObject({
        /**
         * Data
         */
        /*         set,
        func,
        time,
 */
        /**
         * Logic
         */
        /*       when, */
        /**
         * Numbers
         */
        /*       math, */
        /**
         * Text
         */
        /*         len,
        upper,
        lower,
        title,
        rep,
        parse,
        slice, */
        /**
         * Random
         */
        /*         num,
        choose,
        wchoose, */
        /**
         * Wrappers
         */
        /*   oneline,
        void: _void */
        foo: () => "foo"
    });
    // Conditional registers here
    return map;
};

const Yna = class {
    constructor(yna, options = {}, data = {}) {
        const optionsMerged = lightdash.objDefaultsDeep(options, optionsDefault);
        const dataMerged = lightdash.objDefaultsDeep(data, dataDefault);
        this.commands = initCommands();
        /*         if (options.loadJSON) {
            this.tree = yna;
        } else {*/
        const parser = new YnaParser(optionsMerged, dataMerged);
        this.tree = parser.parseString(yna);
        /* }  */
    }
    addCommand(name, fn) {
        /*    this.commandMap.set(name, fn); */
    }
    run(args = [], ctx = {}, options = {}, data = {}) {
        /*         const optionsMerged = objDefaultsDeep(options, optionsRunnerDefault);
        const dataMerged = objDefaults(data, dataDefault);
        const keyMap = initKeys(args, ctx);
        const runner = new YnaRunner(
            this.commandMap,
            keyMap,
            optionsMerged,
            dataMerged
        );

        return runner.execItem(this.tree); */
        return "";
    }
};

module.exports = Yna;
