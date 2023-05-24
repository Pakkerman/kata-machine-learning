function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) return

    const idx = partition(arr, lo, hi)
    qs(arr, lo, idx - 1)
    qs(arr, idx + 1, hi)
}
function partition(arr: number[], lo: number, hi: number) {
    const pivot = arr[hi]
    let idx = lo - 1

    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++
            ;[arr[i], arr[idx]] = [arr[idx], arr[i]]
        }
    }
    idx++
    ;[arr[hi], arr[idx]] = [arr[idx], arr[hi]]
    return idx
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1)
}
