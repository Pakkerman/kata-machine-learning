export default function insertion_sort(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    for (let k = i; k > 0; k--) {
      if (arr[k - 1] <= arr[k]) continue
      const tmp = arr[k - 1]
      arr[k - 1] = arr[k]
      arr[k] = tmp
    }
  }
}
