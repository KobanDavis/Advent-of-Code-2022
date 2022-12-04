import { useFile } from './help'

const inputs = useFile('4.txt')
	.split('\n')
	.map((pairs) => pairs.split(',').map((pair) => pair.split('-').map(Number) as [number, number]))

const solve = ([s1, e1]: [number, number], [s2, e2]: [number, number]) => {
	if (s2 < s1) return
	if (e2 > e1) return
	overlaps++
}

let overlaps = 0
inputs.forEach((pairs) => {
	const [first, second] = pairs
	if (first[0] < second[0]) {
		solve(first, second)
	} else if (second[0] < first[0]) {
		solve(second, first)
	} else {
		overlaps++
	}
})

console.log(overlaps)
