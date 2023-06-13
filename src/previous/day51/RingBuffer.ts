export default class RingBuffer<T> {
  public length: number
  private capacity: number
  public buffer: Array<T | undefined>
  private head: number
  private tail: number

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.buffer = new Array<T | undefined>(this.capacity).fill(undefined)
    this.head = this.tail = 0
  }

  push(item: T): void {
    this.buffer[this.tail] = item
    this.length++
    this.tail = (this.tail + 1) % this.capacity
  }
  get(idx: number): T | undefined {
    console.log(this.buffer)
    if (idx < 0 || this.capacity <= idx) return undefined
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
