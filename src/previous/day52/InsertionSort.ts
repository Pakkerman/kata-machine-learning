export default function insertion_sort(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    for (let k = i; k > 0; k--) {
      if (arr[k] < arr[k - 1]) {
        const tmp = arr[k]
        arr[k] = arr[k - 1]
        arr[k - 1] = tmp
      }
    }
  }
}
