export default function insertion_sort(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    let k = i
    while (k > 0 && arr[k - 1] > arr[k]) {
      const tmp = arr[k - 1]
      arr[k - 1] = arr[k]
      arr[k] = tmp
      k--
    }
  }
}
