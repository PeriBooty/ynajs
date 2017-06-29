# YNA

A YNA Engine in JS

Official YNA Docs: http://fennekid.github.io/beta/yna.html

## Usage

Tag instance creation:

```js
const Yna = require("ynajs");

/**
* Command contructor
* @param {String} yna
* @param {Object} [options={}]
*/
const tag = new Yna("{upper:arg1;}");
```

Tag execution:

```js
/**
* Runs command
* @param {Array} [args=[]]
* @param {Object} [ctx={}]
* @param {Object} [options={}]
* @returns {String}
*/
tag.run(["Argument1"]); //=> "ARGUMENT1"
```

## Know Issues

- `oneline` formatting is slightly different from the official spec
