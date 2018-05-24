import { IYnaTree } from "../../interfaces";
import { ynaCommand } from "../../types";

const SPACE = /\s/;

const toTitleCase = (str: string): string => {
    let inSpace = true;

    return str
        .split("")
        .map(letter => {
            const isSpace = SPACE.test(letter);
            let result = letter.toLowerCase();
            if (inSpace && !isSpace) {
                inSpace = false;
                result = letter.toUpperCase();
            }

            inSpace = isSpace;

            return result;
        })
        .join("");
};

const title: ynaCommand = (runner, tree) => {
    if (tree.length === 0) {
        return new Error("no content");
    }

    const content = runner.execItem(<IYnaTree>tree[0]);

    return toTitleCase(content);
};

export default title;
