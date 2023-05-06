export default function two_crystal_balls(breaks: boolean[]): number {
    const len = breaks.length
    const jump = Math.floor(Math.sqrt(len))
    let idx = jump

    for (; idx < len; idx += jump) if (breaks[idx]) break
    idx -= jump
    for (; idx < len; idx++) if (breaks[idx]) return idx
    return -1
}
