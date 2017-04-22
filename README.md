# YNA

A YNA Engine in JS

[Spec](./SPEC.md)

## Usage

Tag instance creation:

```js
const Yna = require("ynajs");
//Yna(yna, info, options)
const tag = new Yna("{upper:arg1;}");
```

Tag execution:

```js
tag.run(["Argument1"]); //=> "ARGUMENT1"
```
