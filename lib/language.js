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
     * Node IDs
     */
    ids: {
        command: "COMMAND",
        key: "KEY",
        comment: "COMMENT"
    }
};
