function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) return

    const partitionIdx = partition(arr, lo, hi)
    qs(arr, lo, partitionIdx - 1)
    qs(arr, partitionIdx + 1, hi)
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

//  [1, 3, 5, 2, 8, 6, 7]
// i c

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1)
}

function swap(arr: number[], idxA: number, idxB: number): void {
    const tmp = arr[idxA]
    arr[idxA] = arr[idxB]
    arr[idxB] = tmp
}
