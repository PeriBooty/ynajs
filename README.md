# YNA.js

> YNA parser and interpreter

Official YNA Docs: <http://42.rockett.space/yna.html>

This library is **not** fully spec compliant due to differences in the way python and js work and due to how this library operates.
The discord commands can be found [here](https://github.com/FelixRilling/lisa-bot/tree/master/lib/commands/tag), Keep in mind that this functionality is only available in bots.

## Usage

Tag instance creation:

```js
const Yna = require("ynajs");

/**
* Command constructor
* @param {String} yna
* @param {Object} [options={}]
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
* @returns {string}
*/
tag.run(["Argument1", "Argument2"]); //=> "ARGUMENT1"
```

## Differences

YNA.js has a few key differences from the "official" YNA in python:

- Property access is different and limited
- Time formating using a different syntax due to the time library used
- `{oneline:;}` is wonky
- The discord based commands are a bit different due to d.js and d.py
- the official spec says that the contents of an escaped command are not escaped. in ynajs the contents are escaped too.
