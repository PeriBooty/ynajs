import { mapFromObject, objDefaultsDeep } from 'lightdash';

/**
 * Core
 */
/* const set = require("../commands/data/set");
const func = require("../commands/data/func");
const time = require("../commands/data/time");

const when = require("../commands/logic/when");

const upper = require("../commands/text/upper");
const lower = require("../commands/text/lower");
const title = require("../commands/text/title");
const rep = require("../commands/text/rep");
const parse = require("../commands/text/parse");
const slice = require("../commands/text/slice");
const len = require("../commands/text/len");

const math = require("../commands/numbers/math");

const choose = require("../commands/random/choose");
const wchoose = require("../commands/random/wchoose");
const num = require("../commands/random/num");

const oneline = require("../commands/wrapper/oneline");
const _void = require("../commands/wrapper/void");
 */
/**
 * Creates map of default commands
 *
 * @returns {Map}
 */
const initCommands = () => {
    const map = mapFromObject({
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

const optionsDefault = {
    debug: false,
    loadJSON: false
};
const dataDefault = {};
/**
 * YNA instance class
 *
 * @class
 */
const Yna = class {
    /**
     * YNA instance constructor
     *
     * @param {string} yna
     * @param {Object} [options={}]
     * @param {Object} [data={}]
     */
    constructor(yna, options = {}, data = {}) {
        const optionsMerged = objDefaultsDeep(options, optionsDefault);
        const dataMerged = objDefaultsDeep(data, dataDefault);
        this.commands = initCommands();
        /*         if (options.loadJSON) {
            this.tree = yna;
        } else {
            const parser = new YnaParser(optionsMerged, dataMerged);

            this.tree = parser.parseString(yna);
        } */
    }
    /**
     * Adds a new command to the instance command map
     *
     * @param {string} name
     * @param {function} fn
     */
    addCommand(name, fn) {
        /*    this.commandMap.set(name, fn); */
    }
    /**
     * Runs the yna instance and returns the results
     *
     * @param {Array<string>} [args=[]]
     * @param {Object} [ctx={}]
     * @param {Object} [options={}]
     * @param {Object} [data={}]
     * @returns {string}
     */
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

export default Yna;
