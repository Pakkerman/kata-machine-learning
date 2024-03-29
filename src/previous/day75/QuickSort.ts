export default function quick_sort(arr: number[]): void {
  qs(arr)
}

function qs(arr: number[], lo: number = 0, hi: number = arr.length - 1): void {
  if (lo >= hi) return

  const idx = partition(arr, lo, hi)
  qs(arr, idx + 1, hi)
  qs(arr, lo, idx - 1)
}

function partition(arr: number[], lo: number, hi: number): number {
  const pivot = [arr[lo], arr[Math.floor(arr.length / 2)], arr[hi]].sort()[1]
  let idx = lo - 1
  for (let i = lo; i < hi; i++) {
    if (arr[i] >= pivot) continue
    idx++
    const tmp = arr[i]
    arr[i] = arr[idx]
    arr[idx] = tmp
  }

  idx++
  arr[hi] = arr[idx]
  arr[idx] = pivot
  return idx
}
