// after sort the ith item is always will be smaller than i+1th item
// After a single iteration, the largest value will be on the most right
// Continue iterate with smaller and smaller array, until all the value
// satisfy the ith < i+1th item

export default function bubble_sort(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr.length - 1 - i; k++) {
            if (arr[k] < arr[k + 1]) continue
            const tmp = arr[k]
            arr[k] = arr[k + 1]
            arr[k + 1] = tmp
        }
    }
}
