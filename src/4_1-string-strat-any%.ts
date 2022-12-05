import { useFile } from './help'

const inputs = useFile('4.txt')
	.split('\n')
	.map((pairs) => pairs.split(',').map((pair) => pair.split('-').map(Number) as [number, number]))


let overlaps = 0
inputs.forEach((pairs) => {
	const [first, second] = pairs.map(([start, end]) => {
		let string = ''
		for (let i = start; i <= end; i++) string += `<${i}>`
		return string
	})

	if (first.includes(second) || second.includes(first)) {
		overlaps++
	}
})

console.log(overlaps)
