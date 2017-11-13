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
     * Block IDs
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
        maxRecursionDepth: 32 //{func:a;{a};}{a} would cause infinite recursion, this blocks the recursion at a depth of n
    }
};
