export default class RingBuffer<T> {
  public length: number
  public capacity: number
  private read: number
  private write: number
  public buffer: Array<T | undefined>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.read = this.write = 0
    this.buffer = new Array(this.capacity).fill(undefined)
  }

  push(item: T): void {
    if (this.length < this.capacity) this.length++
    this.buffer[this.write] = item
    this.write = (this.write + 1) % this.capacity

    if (this.write === this.read) {
      this.read = (this.read + 1) % this.capacity
    }
  }

  pop(): T | undefined {
    const out = this.buffer[this.read]
    if (out == null) return undefined

    this.buffer[this.read] = undefined

    this.length--
    if (this.length === 0) {
      this.buffer = new Array(this.capacity).fill(undefined)
      return out
    }

    this.read = (this.read + 1) % this.capacity

    return out
  }

  get(idx: number): T | undefined {
    return this.buffer[idx]
  }
}

