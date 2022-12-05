import { useFile } from "./help";

type Move = [number, number, number]

const [diagram, moveset] = useFile('5.txt').split('\n\n')

const parseDiagram = (diagram: string) => {
    const lines = diagram.split('\n')
    lines.splice(lines.length - 1, 1)
    const offset = 4
    const len = (lines[0].length + 1) / offset
    const crates = new Array(len).fill(0).map(() => [])

    lines.reverse().forEach(line => {
        for (let i = 0; i < len; i++) {
            const value = line.charAt(i * offset + 1) // + 1 for [ bracket
            if (value !== ' ') {
                crates[i].push(value)
            }
        }
    })

    return crates
}

const parseMoveset = (moveset: string) => {
    const stringMoves = moveset.split('\n')
    return stringMoves.map(move => {
        const match = [...move.matchAll(/move (\d+) from (\d+) to (\d+)/g)][0]
        return match.slice(1, 4).map(Number) as Move
    })
}

const followMove = ([count, fromCrateIndex, toCrateIndex]: Move) => {
    const toCrate = crates[toCrateIndex - 1]
    const fromCrate = crates[fromCrateIndex - 1]
    toCrate.push(...fromCrate.splice(fromCrate.length - count, count))
}

const crates = parseDiagram(diagram)
const moves = parseMoveset(moveset)

moves.forEach(followMove)

const message = crates.reduce((message, crate) => message + crate.pop(), '')
console.log(message)