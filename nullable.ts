import { IO } from "fp-ts/lib/IO";
import { pipe, flow } from "fp-ts/lib/function";
import * as A from "fp-ts/lib/Array";
import { map, fromNullable, fold, flatten, chain } from "fp-ts/lib/Option";

const log = (val: unknown): IO<void> => () => console.log(val);

const getElementByIndex = <T extends unknown>(index: number) => (
  arr: Array<T>
) => {
  return fromNullable<T>(arr[index]);
};

const logProp = (obj: any) =>
  pipe(
    obj,
    fromNullable,
    map(({ bar }) => bar),
    map(
      flow(
        fromNullable,
        map(({ baz }) => baz)
      )
    ),
    fold(() => log("Foo is not defined"), log)
  );

function iterateArray() {
  const indexes: number[] = [0, 2, 4];
  const data: string[] = ["foo", "bar", "baz"];

  const results = pipe(
    indexes,
    A.map((index) => {
      return getElementByIndex<string>(index)(data);
    })
  );

  log(results);
}

iterateArray();

function test() {
  const foo = {
    bar: {
      baz: "value",
    },
  };

  logProp(foo)();

  logProp({ bar: { a: 123 } })();

  logProp(undefined)();

  logProp({})();
}

test();

function chainTest() {
  const result = chain((x) => {
    return fromNullable(x);
  })(fromNullable({ a: 2 }));

  // both unfold the value from container
  // chain does not wrap result in option automatically
  log(map((x: number) => x - 1)(fromNullable(null)))();
  log(chain((x: any) => fromNullable(x.a))(fromNullable(null)))();

  log(result)();
}

// chainTest();
