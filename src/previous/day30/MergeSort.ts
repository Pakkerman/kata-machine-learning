function ms(arr: number[]): void {
    if (arr.length <= 1) return

    const mid = Math.floor(arr.length / 2)
    const left: number[] = []
    const right: number[] = []

    for (let i = 0; i < arr.length; i++) {
        if (i < mid) {
            left.push(arr[i])
            continue
        }
        right.push(arr[i])
    }

    ms(left)
    ms(right)
    merge(arr, left, right)
}

function merge(arr: number[], left: number[], right: number[]): void {
    let i = 0
    let l = 0
    let r = 0
    while (l < left.length && r < right.length) {
        if (left[l] < right[r]) arr[i++] = left[l++]
        if (left[l] >= right[r]) arr[i++] = right[r++]
    }
    while (l < left.length) arr[i++] = left[l++]
    while (r < right.length) arr[i++] = right[r++]
}

// function ms(arr: number[]): void {
//     const len = arr.length
//     if (len <= 1) return

//     const mid = Math.floor(len / 2)

//     const left = new Array(mid)
//     const right = new Array(len - mid)

//     let i = 0
//     let k = 0

//     for (; i < len; i++) {
//         if (i < mid) {
//             left[i] = arr[i]
//         } else {
//             right[k] = arr[i]
//             k++
//         }
//     }

//     ms(left)
//     ms(right)
//     merge(arr, left, right)
// }
// function merge(arr: number[], left: number[], right: number[]): void {
//     const leftLen = Math.floor(arr.length / 2)
//     const rightLen = arr.length - leftLen
//     let i = 0
//     let l = 0
//     let r = 0
//     console.log(left, right, arr, leftLen, rightLen)

//     // 3, 7 , 1 ,1

//     while (l < leftLen && r < rightLen) {
//         if (left[l] < right[r]) {
//             arr[i] = left[l]
//             i++
//             l++
//         } else {
//             arr[i] = right[r]
//             i++
//             r++
//         }
//     }
//     while (l < leftLen) {
//         arr[i] = left[l]
//         i++
//         l++
//     }
//     while (r < rightLen) {
//         arr[i] = right[r]
//         i++
//         r++
//     }
//     console.log(arr)
// }

export default function merge_sort(arr: number[]): void {
    ms(arr)
}
