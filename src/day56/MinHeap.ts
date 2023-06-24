export default class MinHeap {
  public length: number
  public heap: number[]

  constructor() {
    this.length = 0
    this.heap = []
  }

  insert(value: number): void {
    this.heap[this.length] = value
    this.heapifyUp(this.length)
    this.length++
  }
  delete(): number {
    const out = this.heap[0]
    if (!out) return -1
    this.length--
    if (this.length === 0) {
      this.heap = []
      return out
    }

    this.heap[0] = this.heap[this.length]
    this.heapifyDown(0)
    return out
  }
  private heapifyUp(idx: number): void {
    if (idx === 0) return

    const childVal = this.heap[idx]
    const [parent, parentVal] = this.parent(idx)
    if (parentVal > childVal) {
      this.heap[idx] = parentVal
      this.heap[parent] = childVal
      this.heapifyUp(parent)
    }
  }
  private heapifyDown(idx: number): void {
    const [left, leftVal] = this.left(idx)
    const [right, rightVal] = this.right(idx)
    if (idx >= this.length || left >= this.length) return

    const parentVal = this.heap[idx]
    if (parentVal > leftVal && rightVal > leftVal) {
      this.heap[idx] = leftVal
      this.heap[left] = parentVal
      this.heapifyDown(left)
    } else if (parentVal > rightVal && leftVal > rightVal) {
      this.heap[idx] = rightVal
      this.heap[right] = parentVal
      this.heapifyDown(right)
    }
  }
  private parent(idx: number): [idx: number, val: number] {
    const i = Math.floor((idx - 1) / 2)
    return [i, this.heap[i]]
  }
  private left(idx: number): [idx: number, val: number] {
    const i = idx * 2 + 1
    return [i, this.heap[i]]
  }
  private right(idx: number): [idx: number, val: number] {
    const i = idx * 2 + 2
    return [i, this.heap[i]]
  }
}
