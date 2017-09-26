"use strict";

const isKey = require("../../../types/isKey");
const escapeKeyVal = require("../../lib/escapeKeyVal");

const MAX_LENGTH = 512;
const MAX_COUNT = 64;

/**
 * save command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
 */
module.exports = function (dataRaw) {
    const discord = this.options.plugins.discord;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length !== 2) {
        return new Error("invalid args");
    } else {
        const data = this.execArr(dataRaw);
        const key = data[0];

        if (!isKey(key)) {
            return new Error("invalid key");
        } else {
            const val = escapeKeyVal(this.transformer(data[1]));

            if (key.length >= MAX_LENGTH || val.length >= MAX_LENGTH) {
                return new Error(`exceeds max length of ${MAX_LENGTH}`);
            } else {
                this.keys.set(key, val);

                if (discord.storing) {
                    const {
                        tag,
                        tagStorage,
                        tagKey,
                    } = discord.storing;

                    if (Object.keys(tag.data).length >= MAX_COUNT) {
                        return new Error(`exceeds max save count of ${MAX_COUNT}`);
                    } else {
                        tag.data[key] = val;

                        tagStorage.setKey(tagKey, tag);
                        tagStorage.save(true);
                    }

                }
                return "";
            }
        }
    }
};
