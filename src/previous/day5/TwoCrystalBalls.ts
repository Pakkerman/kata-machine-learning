// Given two crystal balls that will break if drpped from high enough
// distance, determine the exact spot in which it will break in the most optimized way.

// Create an array, with every floor initital with false,
// floor, flip to true and testing if the ball will break on that
// The array is basically a sorted array that contains 0 up till some point its 1 and 1 after to the end
export default function two_crystal_balls(breaks: boolean[]): number {
    const jump = Math.floor(Math.sqrt(breaks.length))
    let i = jump
    for (; i < breaks.length; i += jump) {
        if (breaks[i]) break
    }
    i -= jump
    for (; i < breaks.length; i++) {
        if (breaks[i]) return i
    }

    return -1
}
