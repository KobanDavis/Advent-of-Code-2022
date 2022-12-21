import { useFile } from './help'

const pairs = useFile('13.txt')
	.split('\n\n')
	.map((pair) => pair.split('\n').map((string) => JSON.parse(string)))

const runRules = (first: any[], second: any[]) => {
	first = first.slice()
	second = second.slice()
	do {
		const f = first.shift()
		const s = second.shift()

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

const allPackets = pairs.flat()
const dividerPackets = [[[2]], [[6]]]
allPackets.push(...dividerPackets)

allPackets.sort((a, b) => (runRules(a, b) === false ? 1 : -1))
const total = dividerPackets.reduce((total, packet) => (allPackets.findIndex((p) => p === packet) + 1) * total, 1)
console.log(total)
