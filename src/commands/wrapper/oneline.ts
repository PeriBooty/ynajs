import { IYnaTree } from "../../interfaces";
import { ynaCommand, ynaCommandTransformer } from "../../types";

const NEWLINE = "\n";
const BACKSLASH_ESCAPED = "\\";

const trimLine = (line: string): string => {
    let trimmed = line.trimLeft();

    if (line.endsWith(BACKSLASH_ESCAPED)) {
        trimmed =
            trimmed.substr(0, trimmed.length - BACKSLASH_ESCAPED.length) +
            "\\n";
    }

    return trimmed;
};

const transformerOneline: ynaCommandTransformer = (str: string): string => {
    const result = str
        .split(NEWLINE)
        .map(line => trimLine(line))
        .join("");

    return result.replace(/\\n/g, NEWLINE);
};

const commandOneline: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no content");
    }

    const content = runner.execItem(<IYnaTree>tree[0], transformerOneline);

    return transformerOneline(content);
};

export { commandOneline };
