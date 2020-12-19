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

    map<B>(mapFn: (val: T) => B): Maybe<B | T> {
        return this.isNothing(this.$value) ? Maybe.of(this.$value) : Maybe.of(mapFn(this.$value))
    }

    inspect() {
        console.log(`Extracted value: ${this.$value}`)
    }
}
