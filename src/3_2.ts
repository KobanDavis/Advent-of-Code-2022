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

const priorities = []

while (inputs.length) {
	const [first, second, third] = inputs.splice(0, 3).map((rucksack) => rucksack.split(''))
	const set1 = new Set(first)
	const set2 = new Set(second.filter((letter) => set1.has(letter)))
	priorities.push(priorityMap[third.find((letter) => set2.has(letter))])
}

console.log(priorities.reduce((total, priority) => total + priority, 0))
