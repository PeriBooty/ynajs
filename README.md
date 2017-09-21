# YNA.js

> A YNA Engine in JS

Official YNA Docs: http://42.rockett.space/yna.html

This library is **not** fully spec compilant due to differences in the way python and js work and due to how this library operates. Also keep in mind that the discord-dependant functionality is only available as a plugin.

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

## Differences

YNA.js has a few key differences from the "official" YNA in python:

- Property access is very limited, due to how JS+d.js and Py+d.py handle that
- Time formating using a different syntax due to the time library used
