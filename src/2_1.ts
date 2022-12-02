import { useFile } from "./help";

const inputs = useFile('2.txt').split('\n').map(input => input.toLowerCase().split(' ') as [string, string])

const points = {
    x: 1,
    y: 2,
    z: 3
}

const state = {
    win: 6,
    draw: 3,
    loss: 0
}

const map = {
    a: {
        x: state.draw,
        y: state.win,
        z: state.loss
    },
    b: {
        x: state.loss,
        y: state.draw,
        z: state.win
    },
    c: {
        x: state.win,
        y: state.loss,
        z: state.draw
    }
}


const total = inputs.reduce((total, [enemy, self]) => {
    total += map[enemy][self]
    total += points[self]
    return total
}, 0)

console.log(total)