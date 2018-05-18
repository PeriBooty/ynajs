# YNA.js

> YNA parser and interpreter

Official YNA Docs: <http://42.rockett.space/yna.html>

This library is **not** fully spec compliant due to differences in the way python and JS work and due to how this library operates.
The discord commands can be found [here](https://github.com/FelixRilling/lisa-bot/tree/master/lib/commands/tag), Keep in mind that this functionality is only available in discord contexts.

## Usage

Tag instance creation:

```js
const Yna = require("ynajs");

/**
 * Command constructor
 * @param {string|Object} yna
 * @param {Object} [options={}]
 * @param {Object} [data={}]
 */
const tag = new Yna("{upper:arg1;}");
```

Tag execution:

```js
/**
 * Runs command
 * @param {Array<string>} [args=[]]
 * @param {Object} [ctx={}]
 * @param {Object} [options={}]
 * @param {Object} [data={}]
 * @returns {string}
 */
tag.run(["Argument1", "Argument2"]); //=> "ARGUMENT1"
```

## Differences

YNA.js has a few key differences from the "official" YNA in python:

*   Property access is different and limited
*   `{oneline:;}` is wonky
*   The discord based commands are a bit different due to differences in d.js and d.py
