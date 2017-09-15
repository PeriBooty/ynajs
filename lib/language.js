"use strict";

module.exports = {
    /**
     * Control characters used in commands and keys
     */
    control: {
        tree: {
            open: "{",
            close: "}",
        },
        data: {
            start: ":",
            delimiter: ";",
            list: ",",
            prop: ".",
            comment: "!",
            escape: ">"
        }
    },
    /**
     * Struct IDs
     */
    ids: {
        key: 0,
        command: 1,
        comment: 2
    },
    /**
     * Language config
     */
    config: {
        maxRecursionDepth: 16 //{func:a;{a};}{a} would cause infinite recursion, this blocks the reursion at a depth of n
    }
};
