"use strict";

const Yna = require("../../../dist/yna.common");
const moment = require("moment");

describe("Command time test", () => {
    it("Simple", () => {
        const result = new Yna("{time;}").run();

        expect(result).toBe(
            moment()
                .utcOffset(0)
                .format("HH:mm")
        );
    });
    it("Offset", () => {
        const result = new Yna("{time:+2;}").run();

        expect(result).toBe(
            moment()
                .utcOffset(2)
                .format("HH:mm")
        );
    });
    it("Format string", () => {
        const result = new Yna("{time:+2;%H:%M;}").run();

        expect(result).toBe(
            moment()
                .utcOffset(2)
                .format("HH:mm")
        );
    });
});
