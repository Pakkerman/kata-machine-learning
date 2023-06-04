export default function two_crystal_balls(breaks: boolean[]): number {
    const len = breaks.length
    const j = Math.floor(Math.sqrt(len))
    let i = j
    for (; i < len; i += j) {
        if (breaks[i]) break
    }
    i -= j
    for (; i < len; i++) {
        if (breaks[i]) return i
    }

    return -1
}

7 + 15 + 11 + 3 + 2 + 3 + 6 + 1 + 2 + 2 + 1 + 5 + 4 + 2 + 5 + 8 + 10 + 1
