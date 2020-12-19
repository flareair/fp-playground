import { Maybe } from './containers'

Maybe.of<number>(3).map(val => val + 5).inspect()
Maybe.of<{ prop: string }>({ prop: '123'}).map((data) => data.prop).inspect()


const rawData: number[] = []

Maybe.of<number[]>(rawData).map<number>(data => data[0]).map(data => data.toString())