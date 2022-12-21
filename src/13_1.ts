import { useFile } from './help'

const pairs = useFile('13.txt')
	.split('\n\n')
	.map((pair) => pair.split('\n').map((string) => JSON.parse(string)))

const indicies = []

const runRules = (first: any[], second: any[]) => {
	console.log(first, second)
	do {
		const f = first.shift()
		const s = second.shift()
		console.log(f, s)

		const fIsNum = typeof f === 'number'
		const sIsNum = typeof s === 'number'

		if (f === undefined && s === undefined) continue
		if (f === undefined) return true
		if (s === undefined) return false

		if (fIsNum && sIsNum) {
			if (f !== s) return f < s
		} else if (fIsNum) {
			const r = runRules([f], s)
			if (r !== undefined) return r
		} else if (sIsNum) {
			const r = runRules(f, [s])
			if (r !== undefined) return r
		} else {
			const r = runRules(f, s)
			if (r !== undefined) return r
		}
	} while (first.length > 0 || second.length > 0)
}

for (let i = 0; i < pairs.length; i++) {
	const [first, second] = pairs[i]

	if (runRules(first, second)) {
		indicies.push(i + 1)
	}
}

console.log(indicies.reduce((total, i) => total + i, 0))
