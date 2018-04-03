declare const isNil: any, isError: any, isString: any;
/**
 * Converts an error to a YNA error string
 *
 * @private
 * @param {Error} err
 * @param {string} key
 * @returns {string}
 */
declare const stringifyError: (key: any, err: any) => string;
/**
 * convert val
 *
 * @param {any} val
 * @param {string} [key="unknown"]
 * @returns {string}
 */
declare const stringifyVal: (val: any, key?: string) => any;
