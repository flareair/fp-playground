import axios from 'axios'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as T from 'fp-ts/Task'
import * as E from 'fp-ts/Either'

const getData = (url: string) => pipe(
    TE.tryCatch(
        () => axios.get(url),
        E.toError
    )
)

const getApiData = (url: string) => pipe(
    getData(url),
    TE.map(({ data }) => data),
    TE.fold(
        err => T.of(`Error happened! ${err.message}`),
        data => T.of(data)
    )
)


getApiData('https://api.abalin.net/today?country=us&timezone=US%2FHawaii')().then(console.log)
getApiData('https://api123.abalin.net/today?country=us&timezone=US%2FHawaii')().then(console.log)