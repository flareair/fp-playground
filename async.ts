import axios from 'axios'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as T from 'fp-ts/Task'
import * as E from 'fp-ts/Either'
import * as t from 'io-ts'
import { formatValidationErrors } from 'io-ts-reporters'

const ApiResponse = t.type({
    data: t.type({
        dates: t.type({
            day1: t.number,
            month: t.number
        }),
        namedays: t.UnknownRecord
    })
})

type ApiResponse = t.TypeOf<typeof ApiResponse>

const getData = <T>(url: string) => pipe(
    TE.tryCatch(
        () => axios.get<T>(url),
        E.toError
    )
)

const getApiData = <T>(url: string) => pipe(
    getData<T>(url),
    TE.map(({ data }) => data),
)

const decodeResponse = <T>(decoder: t.Type<T>) => (data: unknown): TE.TaskEither<Error, T> => {
    return pipe(
        TE.fromEither(decoder.decode(data)),
        TE.mapLeft(errors => new Error(formatValidationErrors(errors).join('/n'))),
    )
}

const fetchAndDecode = pipe(
    getApiData<ApiResponse>('https://api.abalin.net/today?country=us&timezone=US%2FHawaii'),
    TE.chain(data => decodeResponse<ApiResponse>(ApiResponse)(data)),
)

fetchAndDecode().then(E.fold(console.error, console.log))
