import { useFile } from "./help";

interface Node {
    parent: string
    size: number
}

const input = useFile('7.txt').split('\n')
const nodes: Record<string, Node> = {}
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
        return path.pop()
    }

    const parent = path.join('_')
    path.push(value)
    const fullPath = path.join('_')

    nodes[fullPath] = {
        parent,
        size: 0
    }
}

const handleOutput = (output: string) => {
    const [size] = output.split(' ')
    if (size === 'dir') return
    let node = nodes[path.join('_')]
    while (node) {
        node.size += Number(size)
        node = nodes[node.parent]
    }
}

input.forEach(handleInput)
console.log(Object.values(nodes).filter(node => node.size <= 100000).reduce((total, node) => total + node.size, 0))