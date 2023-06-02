export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0
    let hi = haystack.length
    while (lo < hi) {
        const idx = Math.floor(lo + (hi - lo) / 2)
        const val = haystack[idx]
        if (val === needle) return true

        if (needle < val) {
            hi = idx
        } else {
            lo = idx + 1
        }
    }
    return false
}
