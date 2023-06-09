export default function bs_list(haystack: number[], needle: number): boolean {
  let [lo, hi] = [0, haystack.length]

  while (lo < hi) {
    const mid = Math.floor(lo + (hi - lo) / 2)
    const val = haystack[mid]

    if (val === needle) return true
    if (needle < val) {
      hi = mid
    } else if (val < needle) {
      lo = mid + 1
    }
  }

  return false
}
