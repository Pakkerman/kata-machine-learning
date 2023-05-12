export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0
    let hi = haystack.length

    while (lo < hi) {
        const midIdx = Math.floor(lo + (hi - lo) / 2)
        const midValue = haystack[midIdx]

        if (midValue === needle) return true

        if (needle < midValue) {
            hi = midIdx
        } else {
            lo = midIdx + 1
        }
    }
    return false
}
