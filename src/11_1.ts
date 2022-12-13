import { useFile } from './help'

const monkeys = useFile('11.txt')
	.split('\n\n')
	.map((monkey) => {
		const line = monkey.split('\n')
		return {
			items: line[1].split(': ')[1].split(', ').map(Number),
			operation: line[2].split(': ')[1],
			testDivisible: Number(line[3].split('divisible by ')[1]),
			rules: {
				true: Number(line[4].match(/\d+/)[0]),
				false: Number(line[5].match(/\d+/)[0]),
			},
		}
	})

const inspections = monkeys.reduce<Record<number, number>>((inspections, _, i) => ((inspections[i] = 0), inspections), {})

const operate = (value: number, operation: string) => {
	let old = value
	let outcome: number
	// new is a reserved word, so replace
	eval(operation.replaceAll('new', 'outcome'))
	return outcome
}

for (let rounds = 0; rounds < 20; rounds++) {
	monkeys.forEach((monkey, monkeyIndex) => {
		const toThrow: [number, number][] = []
		monkey.items.forEach((item, itemIndex) => {
			const operationValue = operate(item, monkey.operation)
			const boredValue = Math.floor(operationValue / 3)
			const isDivisible = String(boredValue % monkey.testDivisible === 0)
			toThrow.push([monkey.rules[isDivisible], itemIndex])
			monkey.items[itemIndex] = boredValue
		})

		inspections[monkeyIndex] += monkey.items.length
		// reverse when splicing, so index order doesn't get screwed
		toThrow.reverse().forEach(([monkeyIndex, itemIndex]) => {
			monkeys[monkeyIndex].items.push(...monkey.items.splice(itemIndex, 1))
		})
	})
}

const [first, second] = Object.values(inspections)
	.sort((a, b) => b - a)
	.slice(0, 2)

console.log(first * second)
