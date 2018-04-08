var YNA = (function () {
    'use strict';

    /**
     * Checks if the value has a certain type-string.
     *
     * @function isTypeOf
     * @memberof Is
     * @since 1.0.0
     * @param {any} val
     * @param {string} type
     * @returns {boolean}
     * @example
     * isTypeOf({}, "object")
     * // => true
     *
     * isTypeOf([], "object")
     * // => true
     *
     * isTypeOf("foo", "string")
     * // => true
     *
     * @example
     * isTypeOf("foo", "number")
     * // => false
     */
    const isTypeOf = (val, type) => typeof val === type;
    /**
     * Checks if a value is an array.
     *
     * `Array.isArray` shorthand.
     *
     * @function isArray
     * @memberof Is
     * @since 1.0.0
     * @param {any} val
     * @returns {boolean}
     * @example
     * isArray([]);
     * // => true
     *
     * isArray([1, 2, 3]);
     * // => true
     *
     * @example
     * isArray({});
     * // => false
     */


    const isArray = Array.isArray;
    /**
     * Checks if a value is undefined.
     *
     * @function isUndefined
     * @memberof Is
     * @since 1.0.0
     * @param {any} val
     * @returns {boolean}
     * @example
     * const a = {};
     *
     * isUndefined(a.b)
     * // => true
     *
     * isUndefined(undefined)
     * // => true
     *
     * @example
     * const a = {};
     *
     * isUndefined(1)
     * // => false
     *
     * isUndefined(a)
     * // => false
     */


    const isUndefined = val => isTypeOf(val, "undefined");
    /**
     * Checks if a value is undefined or null.
     *
     * @function isNil
     * @memberof Is
     * @since 1.0.0
     * @param {any} val
     * @returns {boolean}
     * @example
     * isNil(null)
     * // => true
     *
     * isNil(undefined)
     * // => true
     *
     * @example
     * isNil(0)
     * // => false
     *
     * isNil("")
     * // => false
     */


    const isNil = val => isUndefined(val) || val === null;
    /**
     * Checks if a value is not nil and has a type of object.
     *
     * The main difference to isObject is that functions are not considered object-like,
     * because `typeof function(){}` returns "function".
     *
     * @function isObjectLike
     * @memberof Is
     * @since 1.0.0
     * @param {any} val
     * @returns {boolean}
     * @example
     * isObjectLike({})
     * // => true
     *
     * isObjectLike([])
     * // => true
     *
     * @example
     * isObjectLike(1)
     * // => false
     *
     * isObjectLike(() => 1))
     * // => false
     */


    const isObjectLike = val => !isNil(val) && isTypeOf(val, "object");
    /**
     * Iterates over each entry of an object
     *
     * @function forEachEntry
     * @memberof For
     * @param {object} obj
     * @param {function} fn fn(key: any, val: any, index: number, arr: any[])
     * @example
     * const a = {a: 1, b: 2};
     *
     * forEachEntry(a, (key, val, index) => a[key] = val * index)
     * // a = {a: 0, b: 2}
     */


    const forEachEntry = (obj, fn) => {
      Object.entries(obj).forEach((entry, index) => {
        fn(entry[0], entry[1], index, obj);
      });
    };
    /**
     * Creates a new object with the entries of the input object.
     *
     * @function objFrom
     * @memberof Object
     * @since 1.0.0
     * @param {Object} obj
     * @returns {Object}
     * @example
     * const a = {a: 4, b: 2};
     * const b = objFrom(a);
     *
     * b.a = 10;
     * // a = {a: 4, b: 2}
     * // b = {a: 10, b: 2}
     */


    const objFrom = obj => Object.assign({}, obj);
    /**
     * Maps each entry of an object and returns the result.
     *
     * @function objMap
     * @memberof Object
     * @since 1.0.0
     * @param {Object} obj
     * @param {function} fn fn(key: any, val: any, index: number, arr: any[])
     * @returns {Object}
     * @example
     * objMap({a: 4, b: 2}, (key, val) => val * 2)
     * // => {a: 8, b: 4}
     */


    const objMap = (obj, fn) => {
      const objNew = {};
      forEachEntry(obj, (key, val, index) => {
        objNew[key] = fn(key, val, index, obj);
      });
      return objNew;
    };
    /**
     * Recursively maps each entry of an object and returns the result.
     *
     * @function objMapDeep
     * @memberof Object
     * @since 1.0.0
     * @param {Object} obj
     * @param {function} fn fn(key: any, val: any, index: number, arr: any[])
     * @returns {Object}
     * @example
     * arrMapDeep({a: {b: 2, c: [10, 20]}}, (key, val) => val * 2)
     * // => {a: {b: 4, c: [20, 40]}}
     */


    const objMapDeep = (obj, fn) => objMap(obj, (key, val, index, objNew) => isObjectLike(val) ? objMapDeep(val, fn) : fn(key, val, index, objNew));
    /**
     * Deeply creates a new object with the entries of the input object.
     *
     * @function objFromDeep
     * @memberof Object
     * @since 1.0.0
     * @param {Object} obj
     * @returns {Object}
     * @example
     * const a = {a: {b: 2, c: {a: 10, b: 20}}};
     * const b = objFromDeep(a);
     *
     * b.a.c.a = 123;
     * // a = {a: {b: 2, c: {a: 10, b: 20}}
     * // b = {a: {b: 2, c: {a: 123, b: 20}}}
     */


    const objFromDeep = obj => objMapDeep(objFrom(obj), (key, val) => isObjectLike(val) ? objFrom(val) : val);
    /**
     * Recursively sets every nil property of object to the value from the default object.
     *
     * @function objDefaultsDeep
     * @memberof Object
     * @since 2.7.0
     * @param {Object} obj
     * @param {Object} objDefault
     * @returns {Object}
     * @example
     * objDefaultsDeep({a: [1, 2], c: {f: "x"}}, {a: [1, 2, 3], b: 2, c: {f: "y"}})
     * // => {a: [1, 2, 3], b: 2, c: {f: "x"}}
     */


    const objDefaultsDeep = (obj, objDefault) => {
      const result = isArray(obj) ? Array.from(obj) : objFromDeep(obj);
      forEachEntry(objDefault, (keyDefault, valDefault) => {
        const valGiven = obj[keyDefault];

        if (isObjectLike(valDefault)) {
          result[keyDefault] = isObjectLike(valGiven) ? objDefaultsDeep(valGiven, valDefault) : valDefault;
        } else {
          result[keyDefault] = isUndefined(valGiven) ? valDefault : valGiven;
        }
      });
      return result;
    };
    /**
     * Creates a map from an object.
     *
     * @function mapFromObject
     * @memberof Map
     * @since 1.0.0
     * @param {Object} obj
     * @returns {Map}
     * @example
     * mapFromObject({a: 1, b: 4, c: 5})
     * // => Map<string,number>{a: 1, b: 4, c: 5}
     */


    const mapFromObject = obj => new Map(Object.entries(obj));

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
          open: letter === "{"
          /* open */
          ,
          close: letter === "}"
          /* close */

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
          } else if (isControlTree.close && strStack === 0) {
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
        } else {
          /**
           * Remove empty entries while not in stripEmpty mode
           */
          const dataFiltered = stripEmpty ? strData.filter(item => item.length > 0) : strData;
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

        if (strTrimmed.startsWith("!"
        /* comment */
        )) {
          /**
           * Comment
           */
          const commentText = "{"
          /* open */
          + str.replace("!"
          /* comment */
          , "") + "}"
          /* close */
          ;
          result = [2
          /* comment */
          , commentText];
          resultType = "comment";
        } else if (strTrimmed.startsWith(">"
        /* escape */
        )) {
          /**
           * Escaped
           */
          const escapedText = "{"
          /* open */
          + str.replace(">"
          /* escape */
          , "") + "}"
          /* close */
          ;
          result = escapedText;
          resultType = "escaped";
        } else if (strTrimmed.endsWith(";"
        /* delimiter */
        )) {
          /**
           * Command
           */
          const parsedCommand = this.parseBlockData(str);
          result = [1
          /* command */
          , parsedCommand.name, parsedCommand.args];
          resultType = "command";
        } else {
          /**
           * Key
           */
          const parsedKey = this.parseString(str);
          result = [0
          /* key */
          , parsedKey];
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
          if (strStack === 0 && (letter === ";"
          /* delimiter */
          || letter === ":"
          /* start */
          && !encounteredStart)) {
            const currentBlock = this.parseString(str.substr(strIndexLast, strIndex - strIndexLast), true);
            strData.push(currentBlock);
            strIndexLast = strIndex + 1; // Only use the first data-start, ignore after

            if (letter === ":"
            /* start */
            ) {
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
        } else {
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
      }); // Conditional registers here

      return map;
    };

    const Yna = class {
      constructor(yna, options = {}, data = {}) {
        const optionsMerged = objDefaultsDeep(options, optionsDefault);
        const dataMerged = objDefaultsDeep(data, dataDefault);
        this.commands = initCommands();

        if (optionsMerged.loadJSON) {
          this.tree = yna;
        } else {
          this.tree = new YnaParser(optionsMerged, dataMerged).parseString(yna);
        }
      }

      addCommand(name, fn) {
        this.commands.set(name, fn);
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

    return Yna;

}());
//# sourceMappingURL=yna.js.map
