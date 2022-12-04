import { useFile } from './help'

const inputs = useFile('4.txt')
	.split('\n')
	.map((pairs) => pairs.split(',').map((pair) => pair.split('-').map(Number) as [number, number]))

const solve = ([s1, e1]: [number, number], [s2, e2]: [number, number]) => {
	if (e1 < s2) return
	if (e2 < s1) return
	overlaps++
}

let overlaps = 0
inputs.forEach((pairs) => {
	const [first, second] = pairs
	solve(first, second)
})

console.log(overlaps)
