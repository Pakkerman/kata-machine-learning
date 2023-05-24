export default function bs_list(haystack: number[], needle: number): boolean {
    // set low and high
    // get mid every iteration
    // check value
    // adjust mid

    let low = 0
    let high = haystack.length

    // 1 >> 2 >> 3 >> 4 >> 5
    // find 4
    // 5 >> 4 >> 3 >> 2 >> 1
    // l                      h
    // mid = 0 + 5 /2 floor >> 3
    // needle > mid

    do {
        const mid = Math.floor((low + high) / 2)
        const value = haystack[mid]
        if (value === needle) {
            return true
        }
        if (needle > value) {
            low = mid + 1
        } else {
            high = mid
        }
    } while (low < high)

    return false
}
