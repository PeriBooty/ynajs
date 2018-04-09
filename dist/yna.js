var Yna = (function (lightdash,moment) {
    'use strict';

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
      }); // Conditional registers here

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
      map.set("newrep", false); // Args

      map.set("args", args.join(" "));
      map.set("arglen", args.length);
      args.forEach((arg, index) => {
        map.set(`arg${index + 1}`, arg);
      }); // Context

      lightdash.forEachEntry(ctx, (val, key) => {
        map.set(key, val);
      });
      return map;
    };

    const YnaRunner = class extends YnaLogger {
      constructor(commands, keys, options, data) {
        super("RUNNER", options, data);
        this.commands = commands;
        this.keys = keys;
      }

      execItem(item, transformerCustom) {
        return "";
      }

      execArr(itemArr) {}

      resolveCommand(name, data) {}

      resolveKey(name) {}

    };

    const Yna = class {
      constructor(yna, options = {}, data = {}) {
        const optionsMerged = lightdash.objDefaultsDeep(options, optionsDefault);
        const dataMerged = lightdash.objDefaultsDeep(data, dataDefault);
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
        const optionsMerged = lightdash.objDefaultsDeep(options, optionsRunnerDefault);
        const dataMerged = lightdash.objDefaults(data, dataDefault);
        const keyMap = initKeys(args, ctx);
        console.log(keyMap);
        return new YnaRunner(this.commands, keyMap, optionsMerged, dataMerged).execItem(this.tree);
      }

    };

    return Yna;

}(lightdash,moment));
//# sourceMappingURL=yna.js.map
