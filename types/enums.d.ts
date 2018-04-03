declare enum languageControlTree {
    open = "{",
    close = "}",
}
declare enum languageControlData {
    start = ":",
    delimiter = ";",
    list = ",",
    prop = ".",
    comment = "!",
    escape = ">",
}
declare enum languageIds {
    key = 0,
    command = 1,
    comment = 2,
}
export { languageControlData, languageControlTree, languageIds };
