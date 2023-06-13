export default class RingBuffer<T> {
  public length: number
  public capacity: number
  private head: number
  private tail: number
  public store: (T | undefined)[]

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.store = new Array(this.capacity).fill(undefined)
    this.head = this.tail = 0
  }

  push(item: T): void {
    // Adjest length
    // set the data to the position of the tail
    // tail is now move to the next position, if is exceeded the capacity,
    // it will be move to the 0 position
    this.length++
    this.store[this.tail] = item
    this.tail = (this.tail + 1) % this.capacity
  }
  get(idx: number): T | undefined {
    // Just gettin the item at idx
    return this.store[idx]
  }
  pop(): T | undefined {
    // Because its a queue, following the FIFO, we will pop from the head
    // and after that set the head to undefined
    const out = this.store[this.head]
    if (out == null) return undefined
    this.store[this.head] = undefined

    // Only when the head pointed position has data, will code get this this part,
    // so we can increment the head , and also the head will be cap if exceeds capacity
    this.head = (this.head + 1) % this.capacity
    this.length--
    // If the buffer is empty, move both pointer back to 0
    if (this.length === 0) {
      this.head = this.tail = 0
      return out
    }
    return out
  }
}
