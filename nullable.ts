import { IO } from "fp-ts/lib/IO";
import { pipe } from "fp-ts/lib/function";
import * as A from "fp-ts/lib/Array";
import { map, fromNullable, fold, none, flatten } from "fp-ts/lib/Option";

const log = (val: unknown): IO<void> => () => console.log(val);

const getElementByIndex = <T extends unknown>(index: number) => (
  arr: Array<T>
) => {
  return fromNullable<T>(arr[index]);
};

function iterateArray() {
  const indexes: number[] = [0, 2, 4];
  const data: string[] = ["foo", "bar", "baz"];

  const results = pipe(
    indexes,
    A.map((index) => {
      return getElementByIndex<string>(index)(data);
    })
  );
}

iterateArray();

function test() {
  const foo = {
    bar: {
      baz: "value",
    },
  };

  const logProp = (obj: unknown) => pipe(
    obj,
    fromNullable,
    map(({ bar }) => fromNullable(bar)),
    flatten,
    fold(() => log("Foo is undefined"), log)
  );

  const logFooProp = logProp(foo)
  logFooProp()

  const logNoObj = logProp(undefined)
  logNoObj()

  const logUndefProp = logProp({})
  logUndefProp()
}

test();
