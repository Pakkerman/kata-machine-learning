function qs(arr: number[], lo: number, hi: number): void {
    // Main function to call and recurse
}
function partition(arr: number[], lo: number, hi: number): number {
    // Partition the array return the pivot idx
    // Pick the end as the pivot
    // idx set to lo -1

    const pivot = arr[hi]

    let idx = lo - 1

    // Iterate throught and find item is smaller than pivot, swap
    for (let i = lo; i < hi; i++) {
        if (arr[i] <= arr[hi]) {
            idx++
            const tmp = arr[i]
            arr[i] = arr[idx]
            arr[idx] = tmp
        }
    }

    // swap the hi with
    idx++
    arr[hi] = arr[idx]
    arr[idx] = pivot

    return idx
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1)
}

// function qs(arr: number[], lo: number, hi: number): void {
//     if (lo >= hi) {
//         return
//     }

//     const pivotIdx = partition(arr, lo, hi)

//     qs(arr, lo, pivotIdx - 1)
//     qs(arr, pivotIdx + 1, hi)
// }

// function partition(arr: number[], lo: number, hi: number): number {
//     const pivot = arr[hi]

//     let idx = lo - 1
//     for (let i = lo; i < hi; i++) {
//         if (arr[i] <= pivot) {
//             idx++
//             const tmp = arr[i]
//             arr[i] = arr[idx]
//             arr[idx] = tmp
//         }
//     }
//     idx++
//     arr[hi] = arr[idx]
//     arr[idx] = pivot

//     return idx
// }

// export default function quick_sort(arr: number[]): void {
//     qs(arr, 0, arr.length - 1)
// }
