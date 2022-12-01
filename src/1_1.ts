import { useFile } from './help'

const inputs = useFile('1.txt')
	.split('\n\n')
	.map((group) => group.split('\n').map(Number))

const sorted = inputs.map((group) => group.reduce((total: number, calories: number) => total + calories, 0)).sort((a, b) => a - b)

console.log(sorted.pop())
