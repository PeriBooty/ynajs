declare const enum ynaControlTree {
    open = "{",
    close = "}"
}
declare const enum ynaControlData {
    start = ":",
    delimiter = ";",
    list = ",",
    prop = ".",
    comment = "!",
    escape = ">"
}
declare const enum ynaIds {
    key = 0,
    command = 1,
    comment = 2
}
export { ynaControlData, ynaControlTree, ynaIds };
