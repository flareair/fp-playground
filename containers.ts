export class Maybe<T> {
    private $value: T
    
    constructor(value: any) {
        this.$value = value
    }

    static of<A>(value: A) {
        return new Maybe<A>(value)
    }

    private isNothing(value: T) {
        return value === null || value === undefined
    }

    map<B>(mapFn: (val: T) => B) {
        return this.isNothing(this.$value) ? this : Maybe.of<B>(mapFn(this.$value))
    }

    inspect() {
        console.log(`Extracted value: ${this.$value}`)
    }
}
