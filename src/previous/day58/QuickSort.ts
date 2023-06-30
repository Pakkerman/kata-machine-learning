export default function quick_sort(arr: number[]): void {
  slice(arr, 0, arr.length - 1)
}

function slice(arr: number[], lo: number, hi: number): void {
  if (lo >= hi) return

  const idx = partition(arr, lo, hi)

  slice(arr, lo, idx - 1)
  slice(arr, idx + 1, hi)
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
