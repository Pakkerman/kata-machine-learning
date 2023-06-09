export default class MinHeap {
  public length: number
  public data: number[]

  constructor() {
    this.length = 0
    this.data = []
  }

  insert(value: number): void {
    this.data[this.length] = value
    this.heapifyUp(this.length)
    this.length++
  }
  delete(): number {
    const out = this.data[0]
    if (!out) return -1

    this.length--
    if (this.length === 0) {
      this.data = []
      return out
    }

    this.data[0] = this.data[this.length]
    this.heapifyDown(0)
    return out
  }
  private heapifyDown(idx: number): void {
    const [left, leftVal] = this.left(idx)
    const [right, rightVal] = this.right(idx)

    if (left >= this.length || idx >= this.length) return

    const parentVal = this.data[idx]
    if (parentVal > leftVal && rightVal > leftVal) {
      this.data[left] = parentVal
      this.data[idx] = leftVal
      this.heapifyDown(left)
    } else if (parentVal > rightVal && leftVal > rightVal) {
      this.data[right] = parentVal
      this.data[idx] = rightVal
      this.heapifyDown(right)
    }
  }
  private heapifyUp(idx: number): void {
    if (idx === 0) return
    const [parent, parentVal] = this.parentVal(idx)
    const childVal = this.data[idx]

    if (parentVal > childVal) {
      this.data[idx] = parentVal
      this.data[parent] = childVal
      this.heapifyUp(parent)
    }
  }
  parentVal(idx: number): [number, number] {
    const i = Math.floor((idx - 1) / 2)
    return [i, this.data[i]]
  }
  right(idx: number): [number, number] {
    const i = idx * 2 + 1
    return [i, this.data[i]]
  }
  left(idx: number): [number, number] {
    const i = idx * 2 + 2
    return [i, this.data[i]]
  }
}
