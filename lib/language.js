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
        content: {
            start: ":",
            delimiter: ";",
            list: ",",
            prop: ".",
            comment: "!",
            escape: ">"
        }
    },
    /**
     * Node IDs
     */
    ids: {
        string: 0,
        command: 1,
        key: 2,
        comment: 3
    }
};
