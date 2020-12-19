import { pipe, flow } from "fp-ts/lib/function";
import { map, fromNullable, fold, flatten, chain } from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";

const notEmpty = (input: string): boolean => input.length > 0
const notLonger = (length: number) => (input : string): boolean => input.length <= length
const noNumbers = (input: string): boolean => !/\d/.test(input);

type Validator = (input: string) => boolean

const createValidator = (...validators: Validator[]) => (input) => {
    return pipe(
        input,
        fromNullable,
        map(input => A.array.map(validators, validator => validator(input))),
        map(A.reduce(true, (prev: boolean, next: boolean) => prev && next)),
        fold(() => false, result => result)
    )
}


const validateData = createValidator(notEmpty, notLonger(15), noNumbers)


console.log(validateData('Some valid'))
console.log(validateData('More valid'))

console.log(validateData('More data 123'))
console.log(validateData('More 123 12312312312331231 31'))
console.log(validateData(''))
console.log(validateData(undefined))
