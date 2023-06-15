export default class RingBuffer<T> {
  public length: number
  private capacity: number
  private buffer: Array<T | undefined>
  private head: number
  private tail: number

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.buffer = new Array(capacity).fill(undefined)
    this.head = this.tail = 0
  }

  push(item: T): void {
    this.length++
    this.buffer[this.tail] = item
    this.tail = (this.tail + 1) % this.capacity
    if (this.tail === this.head) this.head = (this.head + 1) % this.capacity
  }
  get(idx: number): T | undefined {
    console.log(this.buffer)
    return this.buffer[idx]
  }
  pop(): T | undefined {
    const out = this.buffer[this.head]
    if (!out) return undefined
    this.length--
    this.buffer[this.head] = undefined
    if (this.length === 0) {
      this.head = this.tail = 0
      return out
    }
    this.head = (this.head + 1) % this.capacity
    console.log(this.buffer)
    return out
  }
}
