export default function two_crystal_balls(breaks: boolean[]): number {
    const len = breaks.length
    const jump = Math.floor(Math.sqrt(len))
    let i = jump
    for (; i < len; i += jump) if (breaks[i]) break
    i -= jump
    for (; i < len; i++) if (breaks[i]) return i
    return -1
}
