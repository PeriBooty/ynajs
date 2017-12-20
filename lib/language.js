"use strict";

module.exports = {
    /**
     * Control characters used in commands and keys
     */
    control: {
        tree: {
            open: "{",
            close: "}"
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
    }
};
