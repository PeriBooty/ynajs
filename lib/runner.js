"use strict";

const LANGUAGE_YNA = require("./language");
const IDS = LANGUAGE_YNA.ids;

const {
    hasPath,
    getPath,
    isFunction,
    isObjectPlain,
    isArray,
    isNil
} = require("lightdash");
const YnaBase = require("./base");
const stringifyError = require("./util/stringifyError");
const stringifyVal = require("./util/stringifyVal");

/**
 * default transformer with no functionality on its own
 *
 * @param {string} str
 * @return {string}
 */
const transformerDefault = str => str;

/**
 * Runner class
 *
 * @class
 */
module.exports = class extends YnaBase {
    /**
     * Runner constructor
     *
     * @constructor
     */
    constructor(commands, keys, options, data) {
        super("RUNNER", options, data);

        this.transformer = transformerDefault;
        this.commands = commands;
        this.keys = keys;
    }
    /**
     * Executes a single item
     *
     * @param {any} item
     * @returns {string}
     */
    execItem(item, transformerCustom = null) {
        if (isNil(item)) {
            throw new TypeError(`Found illegal item during run: '${item}'; Aborting.`);
        }

        const itemFlag = item[0];
        const itemContent = item.slice(1);
        let result;
        let resultType;

        /**
         * Binds custom transformer
         */
        if (transformerCustom) {
            this.transformer = transformerCustom;
        }

        if (itemFlag === IDS.key) {
            //Key
            const keyName = this.execItem(itemContent[0]);

            result = this.resolveKey(keyName);
            resultType = "key";
        } else if (itemFlag === IDS.command) {
            //Command
            const commandName = this.execItem(itemContent[0]);
            const commandArgs = itemContent[1];

            result = this.resolveCommand(commandName, commandArgs);
            resultType = "command";
        } else if (itemFlag === IDS.comment) {
            //Comment (ignored)
            result = "";
            resultType = "comment";
        } else if (isArray(item)) {
            //Array
            result = this.transformer(this.execArr(item).join(""));
            resultType = "array";
        } else {
            //String
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
    /**
     * Runs exec over every array element
     *
     * @param {Array<any>} arr
     * @returns {Array<string>}
     */
    execArr(itemArr) {
        const result = itemArr.map(item => this.execItem(item));

        this.log(["array"], result);

        return result;
    }
    /**
     * Accesses and runs a command
     *
     * @param {string} name
     * @param {Array<any>} data
     * @returns {string}
     */
    resolveCommand(name, data) {
        if (this.commands.has(name)) {
            const command = this.commands.get(name);
            const result = command.call(this, data);

            return stringifyVal(name, result);
        } else {
            return stringifyError(name, new Error("unknown command"));
        }
    }
    /**
     * Accesses and returns a key
     *
     * @param {string} name
     * @returns {string}
     */
    resolveKey(name) {
        const path = name.split(LANGUAGE_YNA.control.data.prop);

        /**
         * resolve props
         */
        if (this.keys.has(path[0])) { //First level check
            const entry = this.keys.get(path[0]);
            let resolved = entry;
            let result;

            if (path.length > 1) { //Only enter if more than one prop in path
                const pathRest = path.slice(1);

                if (hasPath(entry, pathRest)) {
                    resolved = getPath(entry, pathRest);
                } else {
                    return stringifyError(name, new Error(`does not have '${pathRest}'`));
                }
            }

            if (isFunction(resolved)) {
                result = resolved();
            } else if (isObjectPlain(resolved)) {
                result = resolved.__default;
            } else {
                result = resolved;
            }

            return stringifyVal(name, result);
        } else {
            return stringifyError(name, new Error("unknown key"));
        }
    }
};
