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
    if (out == undefined) return -1

    this.length--
    if (this.length === 0) {
      this.heap = []
      return out
    }

    this.heap[0] = this.heap[this.length]
    this.heapifyDown(0)
    return out
  }
  private heapifyUp(childIdx: number): void {
    if (childIdx === 0) return
    const [parent, parentVal] = this.parent(childIdx)
    const childVal = this.heap[childIdx]

    if (parentVal > childVal) {
      this.heap[childIdx] = parentVal
      this.heap[parent] = childVal
      this.heapifyUp(parent)
    }
  }
  private heapifyDown(parentIdx: number): void {
    const [left, leftVal] = this.left(parentIdx)
    const [right, rightVal] = this.right(parentIdx)
    if (parentIdx >= this.length || left >= this.length) return
    const parentVal = this.heap[parentIdx]

    if (parentVal > leftVal && rightVal > leftVal) {
      this.heap[parentIdx] = leftVal
      this.heap[left] = parentVal
      this.heapifyDown(left)
    } else if (parentVal > rightVal && leftVal > rightVal) {
      this.heap[parentIdx] = rightVal
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
