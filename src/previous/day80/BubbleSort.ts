export default function bubble_sort(arr: number[]): void {
  console.log(arr)
  for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < arr.length - i - 1; k++) {
      if (arr[k] <= arr[k + 1]) continue
      const tmp = arr[k]
      arr[k] = arr[k + 1]
      arr[k + 1] = tmp
      console.log(arr)
    }
  }
}
