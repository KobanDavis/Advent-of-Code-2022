import { useFile } from "./help";

const inputs = useFile('2.txt').split('\n').map(input => input.toLowerCase().split(' ') as [string, string])


const points = {
    x: 0,
    y: 3,
    z: 6,
}

const state = {
    a: 1,
    b: 2,
    c: 3
}

const map = {
    x: {
        a: state.c,
        b: state.a,
        c: state.b
    },
    y: {
        a: state.a,
        b: state.b,
        c: state.c
    },
    z: {
        a: state.b,
        b: state.c,
        c: state.a
    }
}


const total = inputs.reduce((total, [enemy, self]) => {
    total += map[self][enemy]
    total += points[self]
    return total
}, 0)

console.log(total)