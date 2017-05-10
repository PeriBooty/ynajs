"use strict";

/**
 * @description
 * Creates a new array limited to the specified range, and optionnaly extracts only n-th items
 * with the `step` argument, similar to Python slice operators.
 * The array can also be reversed easily depending on the sign of the `step` parameter.
 * The slice function uses the builtin Javscript `array.slice` method.
 *
 * @param {Array} input Source array to be sliced.
 * @param {number} start Slice start index. If the `start` number
 *     is positive, the slice will start at index `start`.
 *     If the `start` number is negative, the slice will start from the n-th item
 *     from the end of the source array.
 * @param {number} end Slice end index. If the `end` number
 *     is positive, the slice will end at index `end` exluded.
 *     If the `end` number is negative, the slice will end at the n-th item
 *     from the end of the source array.
 * @param {number} step Slice items step. If the `step` number
 *     is specified, the function will only return each n-th item based on its index.
 *     If the `step` number is negative, the slice will be reversed and we return
 *     each n-th item in reversed order.
 * @returns {Array} A new sub-array containing `Math.floor(end-start/step)`
 */
function slice(array, from, to, step) {
    if (from === null) from = 0;
    if (to === null) to = array.length;
    if (!step) return array.slice(from, to);

    var result = Array.prototype.slice.call(array, from, to);

    if (step < 0) result.reverse();
    step = Math.abs(step);

    if (step > 1) {
        var final = [];
        for (var i = result.length - 1; i >= 0; i--) {
            (i % step === 0) && final.push(result[i]);
        };
        final.reverse();
        result = final;
    }

    return result;
}
