"use strict";

const Yna = require("../../../dist/yna.common");

const RUNS = 2 ** 8;

describe("Command num test", () => {
    for (let i = 0; i < RUNS; i++) {
        it(`Simple#${i}`, () => {
            const result = Number(new Yna("{num:0;100;}").run());

            expect(
                result <= 100 && result >= 0 && Number.isInteger(result)
            ).toBeTruthy();
        });
    }

    for (let i = 0; i < RUNS; i++) {
        it(`Inverted#${i}`, () => {
            const result = Number(new Yna("{num:100;0;}").run());

            expect(
                result <= 100 && result >= 0 && Number.isInteger(result)
            ).toBeTruthy();
        });
    }

    for (let i = 0; i < RUNS; i++) {
        it(`Inverted 2#${i}`, () => {
            const result = Number(new Yna("{num:-10;10;}").run());

            expect(
                result <= 10 && result >= -10 && Number.isInteger(result)
            ).toBeTruthy();
        });
    }

    for (let i = 0; i < RUNS; i++) {
        it(`Float#${i}`, () => {
            const result = Number(new Yna("{num:0;100;0.5;}").run());

            expect(result <= 100 && result >= 0).toBeTruthy();
        });
    }

    it("No args", () => {
        const result = new Yna("{num;}").run();

        expect(result).toEqual("<num:no args>");
    });

    it("Invalid args", () => {
        const result = new Yna("{num:1;foo;}").run();

        expect(result).toEqual("<num:invalid args>");
    });

    it("Invalid range", () => {
        const result = new Yna("{num:1;1;}").run();

        expect(result).toEqual("<num:invalid range>");
    });

    it("Invalid range 2", () => {
        const result = new Yna("{num:0;100;0;}").run();

        expect(result).toEqual("<num:invalid range>");
    });
});
