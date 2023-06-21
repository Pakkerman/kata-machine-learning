export default class RingBuffer<T> {
  public length: number
  private capacity: number
  private head: number
  private tail: number
  private buffer: Array<T | undefined>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.head = this.tail = 0
    this.buffer = new Array(this.capacity).fill(undefined)
  }

  push(item: T): void {
    this.buffer[this.tail] = item
    this.length++
    this.tail = (this.tail + 1) % this.capacity
    if (this.head === this.tail) this.head = this.tail
  }
  get(idx: number): T | undefined {
    console.log(this.buffer)
    return this.buffer[idx]
  }
  pop(): T | undefined {
    const out = this.buffer[this.head]
    if (!out) return undefined

    this.buffer[this.head] = undefined

    this.length--
    if (this.length === 0) {
      this.head = this.tail = 0
      return out
    }

    this.head = (this.head + 1) % this.capacity
    return out
  }
}
