export default class RingBuffer<T> {
  public length: number
  private capacity: number
  private read: number
  private write: number
  buffer: Array<T | undefined>

  constructor(capacity: number = 3) {
    this.length = this.read = this.write = 0
    this.capacity = capacity
    this.buffer = new Array(capacity).fill(undefined)
  }

  push(item: T): void {
    if (!this.buffer[this.write]) this.length++ // if is a new item
    this.buffer[this.write] = item
    this.write = (this.write + 1) % this.capacity
    if (this.read === this.write) this.read = (this.read + 1) % this.capacity
  }
  get(idx: number): T | undefined {
    return this.buffer[idx]
  }
  pop(): T | undefined {
    const out = this.buffer[this.read]
    if (!out) return undefined
    this.buffer[this.read] = undefined
    this.length--
    if (this.length === 0) {
      this.read = this.write = 0
      this.buffer = new Array(this.capacity).fill(undefined)
      return out
    }

    this.read = (this.read + 1) % this.capacity
    return out
  }
}
