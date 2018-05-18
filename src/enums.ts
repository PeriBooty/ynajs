const enum ynaControlTree {
    open = "{",
    close = "}"
}

const enum ynaControlData {
    start = ":",
    delimiter = ";",
    list = ",",
    prop = ".",
    comment = "!",
    escape = ">"
}

const enum ynaIds {
    key = 0,
    command = 1,
    comment = 2
}

export { ynaControlData, ynaControlTree, ynaIds };
