import { Maybe } from './containers'

Maybe.of<number>(3).map(val => val + 5).inspect()
Maybe.of<{ prop: string }>(undefined).map((data) => data.prop).inspect()


const rawData = null

Maybe.of(rawData).map(data => data[0]).map(data => data.toString())