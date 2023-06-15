import ArrayList from "./ArrayList"

export default class MinHeap {
  public length: number
  public data: ArrayList<number>

  constructor() {
    this.length = 0
    this.data = new ArrayList(1)
  }

  insert(value: number): void {
    this.data.append(value)
    this.heapifyUp(this.length)
    this.length++
  }
  delete(): number {
    const out = this.data.get(0)
    if (!out) return -1

    this.length--
    if (this.length === 0) {
      this.data = new ArrayList(10)
      return out
    }

    // const last = this.data.get(this.length)!
    // this.data.prepend(last)
    // this.data.remove(last)
    this.data.data[0] = this.data.data[this.length]
    this.heapifyDown(0)
    return out
  }
  private heapifyDown(idx: number): void {
    const [left, leftVal] = this.left(idx)
    const [right, rightVal] = this.right(idx)
    if (left >= this.length || idx >= this.length) return

    const parentVal = this.data.get(idx)!

    if (parentVal > leftVal && rightVal > leftVal) {
      this.data.data[left] = parentVal
      this.data.data[idx] = leftVal
      this.heapifyDown(left)
    } else if (parentVal > rightVal && leftVal > rightVal) {
      this.data.data[right] = parentVal
      this.data.data[idx] = rightVal
      this.heapifyDown(right)
    }
  }
  private heapifyUp(idx: number): void {
    if (idx === 0) return
    const [parent, parentVal] = this.parent(idx)
    const childVal = this.data.get(idx)!

    if (parentVal > childVal) {
      this.data.removeAt(parent)
      this.data.insertAt(childVal, parent)
      this.data.removeAt(idx)
      this.data.insertAt(parentVal, idx)
      this.heapifyUp(parent)
    }
  }

  private parent(idx: number): [number, number] {
    const i = Math.floor((idx - 1) / 2)
    const val = this.data.get(i) || -1
    return [i, val]
  }
  private left(idx: number): [number, number] {
    const i = idx * 2 + 1
    const val = this.data.get(i) || -1
    return [i, val]
  }
  private right(idx: number): [number, number] {
    const i = idx * 2 + 2
    const val = this.data.get(i) || -1
    return [i, val]
  }
}
