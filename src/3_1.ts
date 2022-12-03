import { useFile } from './help'

const inputs = useFile('3.txt').split('\n')

const createMap = () => {
	const map: Record<string, number> = {}
	let offset = 'a'.charCodeAt(0)
	for (let i = 0; i < 26; i++) {
		map[String.fromCharCode(offset + i)] = i + 1
	}

	offset = 'A'.charCodeAt(0)
	for (let i = 0; i < 26; i++) {
		map[String.fromCharCode(offset + i)] = i + 27
	}

	return map
}

const priorityMap = createMap()

const compartments = inputs.map((input) => {
	const letters = input.split('')
	return [letters.splice(0, input.length / 2), letters]
})

const priorities = compartments.map(([first, second]) => {
	const set = new Set(first)
	return priorityMap[second.find((letter) => set.has(letter))]
})

console.log(priorities.reduce((total, priority) => total + priority, 0))
