import { useFile } from './help'

const input = useFile('6.txt')
const packetLength = 4

for (let i = packetLength; i < input.length; i++) {
	const unique = new Set(input.slice(i - packetLength, i))
	if (unique.size === packetLength) {
		console.log(i)
		break
	}
}
