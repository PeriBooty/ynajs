'use strict';

var lightdash = require('lightdash');

const YnaLogger = class {
    constructor(name, options, data) {
        this.name = name;
        this.options = options;
        this.data = data;
    }
    log(arr, data) {
        if (this.options.debug) {
            const path = [this.name, ...arr].join("->");
            console.log(`${path}: ${JSON.stringify(data)}`);
        }
    }
};

const YnaParser = class extends YnaLogger {
    constructor(options, data) {
        super("parser", options, data);
    }
    parseString(yna) { }
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
