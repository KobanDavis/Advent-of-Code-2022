import { useFile } from './help'

const input = useFile('6.txt')

const solve = (input: string, packetLength: number) => {
	const map: Record<string, number> = {}
	let uniqueCount = 0

	for (let i = 0; i < input.length; i++) {
		const letter = input[i]
		// if letter not in map then add an entry
		if (letter in map === false) {
			map[letter] = 0
		}
		// if letter is unique increment
		if (++map[letter] === 1) {
			uniqueCount++
		}
		// decrement if first letter of packet was unique
		if (i >= packetLength && --map[input[i - packetLength]] === 0) {
			uniqueCount--
		}
		// if we have as many unique letters as expected, break
		if (uniqueCount === packetLength) {
			console.log(i + 1)
			break
		}
	}
}

solve(input, 4)
solve(input, 14)
