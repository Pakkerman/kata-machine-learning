function quickSort(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) return

    const idx = partition(arr, lo, hi)
    quickSort(arr, lo, idx - 1)
    quickSort(arr, idx + 1, hi)
}
function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi]
    let idx = lo - 1

    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++
            const tmp = arr[i]
            arr[i] = arr[idx]
            arr[idx] = tmp
        }
    }
    idx++
    arr[hi] = arr[idx]
    arr[idx] = pivot
    return idx
}

export default function quick_sort(arr: number[]): void {
    quickSort(arr, 0, arr.length - 1)
}
