// 25
export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0
    let hi = haystack.length
    while (lo < hi) {
        const mid = Math.floor(lo + (hi - lo) / 2)
        const mVal = haystack[mid]

        if (mVal === needle) return true

        if (needle < mVal) {
            hi = mid
        } else {
            lo = mid + 1
        }
    }

    return false
}
