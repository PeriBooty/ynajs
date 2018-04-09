'use strict';

var lightdash = require('lightdash');
var moment = require('moment');

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
const stringifyVal = (val, key = "unknown") => {
    if (lightdash.isString(val))
        return val;
    else if (val === true)
        return "True";
    else if (val === false)
        return "False";
    else if (lightdash.isNil(val))
        return "None";
    else if (lightdash.isError(val))
        return stringifyError(key, val);
    return String(val);
};

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
                strData.push(this.parseBlock(currentString.substr(1, currentString.length - 1)));
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
            name: "",
            args: ""
        };
        let resultType;
        let strIndexLast = 0;
        let encounteredStart = false;
        const strStackEnd = iterateString(str, (letter, strIndex, strStack) => {
            if (strStack === 0 &&
                (letter === ";" /* delimiter */ ||
                    (letter === ":" /* start */ && !encounteredStart))) {
                const currentBlock = this.parseString(str.substr(strIndexLast, strIndex - strIndexLast), true);
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
const optionsRunnerDefault = {
    debug: false,
    depth: 0 // Used for recursion depth checks
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

const toDatetime = time => moment.utc(time).format("YYYY-MM-DD HH:mm:ss:SSSSSS");

/**
 * Creates map of default keys
 *
 * @param {Array<string>} args
 * @param {Object} ctx
 * @returns {Map}
 */
const initKeys = (args, ctx) => {
    const map = new Map();
    map.set("time", toDatetime(moment.utc()));
    map.set("newrep", false);
    // Args
    map.set("args", args.join(" "));
    map.set("arglen", args.length);
    args.forEach((arg, index) => {
        map.set(`arg${index + 1}`, arg);
    });
    // Context
    lightdash.forEachEntry(ctx, (val, key) => {
        map.set(key, val);
    });
    return map;
};

const transformerDefault = (str) => str;
const YnaRunner = class extends YnaLogger {
    constructor(commands, keys, options, data) {
        super("RUNNER", options, data);
        this.commands = commands;
        this.keys = keys;
        this.transformer = transformerDefault;
    }
    execItem(item, transformerCustom) {
        const itemId = item[0];
        const itemContent = item.slice(1);
        let result;
        let resultType;
        /**
         * Binds custom transformer
         */
        if (transformerCustom) {
            this.transformer = transformerCustom;
        }
        if (itemId === 0 /* key */) {
            // Key
            const keyName = this.execItem(itemContent[0]);
            result = this.resolveKey(keyName);
            resultType = "key";
        }
        else if (itemId === 1 /* command */) {
            // Command
            const commandName = this.execItem(itemContent[0]);
            const commandArgs = itemContent[1];
            result = this.resolveCommand(commandName, commandArgs);
            resultType = "command";
        }
        else if (itemId === 2 /* comment */) {
            // Comment (ignored)
            result = "";
            resultType = "comment";
        }
        else if (lightdash.isArray(item)) {
            // Array
            const str = this.execArr(item).join("");
            result = this.transformer(str);
            resultType = "array";
        }
        else {
            // String
            result = item;
            resultType = "string";
        }
        /**
         * Unbinds custom transformer
         */
        if (transformerCustom) {
            this.transformer = transformerDefault;
        }
        this.log(["item", resultType], result);
        return result;
    }
    execArr(itemArr) {
        const result = itemArr.map(item => this.execItem(item));
        this.log(["array"], result);
        return result;
    }
    resolveCommand(name, data) {
        if (!this.commands.has(name)) {
            return stringifyError(name, new Error("unknown command"));
        }
        const command = this.commands.get(name);
        const result = command.call(this, data);
        return stringifyVal(result, name);
    }
    resolveKey(name) {
        const path = name.split("." /* prop */);
        if (!this.keys.has(path[0])) {
            return stringifyError(name, new Error("unknown key"));
        }
        // First level check
        const entry = this.keys.get(path[0]);
        let resolved = entry;
        let result;
        if (path.length > 1) {
            // Only enter if more than one prop in path
            const pathRest = path.slice(1);
            if (!lightdash.hasPath(entry, pathRest)) {
                return stringifyError(name, new Error(`does not have '${pathRest}'`));
            }
            resolved = lightdash.getPath(entry, pathRest);
        }
        if (lightdash.isFunction(resolved)) {
            result = resolved();
        }
        else if (lightdash.isObjectPlain(resolved)) {
            result = resolved.__default;
        }
        else {
            result = resolved;
        }
        return stringifyVal(result, name);
    }
};

const Yna = class {
    constructor(yna, options = {}, data = {}) {
        const optionsMerged = lightdash.objDefaultsDeep(options, optionsDefault);
        const dataMerged = lightdash.objDefaultsDeep(data, dataDefault);
        this.commands = initCommands();
        if (optionsMerged.loadJSON) {
            this.tree = yna;
        }
        else {
            this.tree = new YnaParser(optionsMerged, dataMerged).parseString(yna);
        }
    }
    addCommand(name, fn) {
        this.commands.set(name, fn);
    }
    run(args = [], ctx = {}, options = {}, data = {}) {
        const optionsMerged = lightdash.objDefaultsDeep(options, optionsRunnerDefault);
        const dataMerged = lightdash.objDefaults(data, dataDefault);
        const keyMap = initKeys(args, ctx);
        return new YnaRunner(this.commands, keyMap, optionsMerged, dataMerged).execItem(this.tree);
    }
};

module.exports = Yna;
