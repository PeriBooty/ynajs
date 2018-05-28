import { isTypeOf } from "lightdash";

const checkArrayType = (arr: any[], type: string): boolean =>
    arr.every(item => isTypeOf(item, type));

export { checkArrayType };
