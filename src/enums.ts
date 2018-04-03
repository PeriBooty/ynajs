enum languageControlTree {
    open = "{",
    close = "}"
}

enum languageControlData {
    start = ":",
    delimiter = ";",
    list = ",",
    prop = ".",
    comment = "!",
    escape = ">"
}

enum languageIds {
    key = 0,
    command = 1,
    comment = 2
}

export { languageControlData, languageControlTree, languageIds };
