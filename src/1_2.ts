import { useFile } from './help'

const inputs = useFile('1.txt')
	.split('\n\n')
	.map((group) => group.split('\n').map(Number))

const total = (total: number, calories: number) => total + calories

const sorted = inputs.map((group) => group.reduce(total, 0)).sort((a, b) => b - a)

console.log(sorted.slice(0, 3).reduce(total, 0))
