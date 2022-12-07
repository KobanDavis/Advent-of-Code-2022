import { useFile } from "./help";

const input = useFile('7.txt').split('\n')
const nodes: Record<string, number> = {}
const path: string[] = []

const handleInput = (input: string) => {
    if (input.startsWith('$ cd')) {
        handleCommand(input)
    } else if (input[0].match(/\d/)) {
        handleOutput(input)
    }
}

const handleCommand = (command: string) => {
    const value = command.slice('$ cd '.length)
    if (value === '..') {
        path.pop()
    } else {
        path.push(value)
        nodes[path.join('_')] = 0
    }
}

const handleOutput = (output: string) => {
    const [size] = output.split(' ')
    if (size === 'dir') return
    path.forEach((_, i) => nodes[path.slice(0, i + 1).join('_')] += Number(size))
}

input.forEach(handleInput)
console.log(Object.values(nodes).filter(node => node <= 100000).reduce((total, node) => total + node, 0))