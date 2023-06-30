export default class ArrayList<T> {
  public length: number
  public capacity: number
  private data: T[]

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.data = new Array(this.capacity)
  }

  prepend(item: T): void {
    this.length++
    this.resize()

    for (let i = this.length - 1; i > 0; i--) {
      this.data[i] = this.data[i - 1]
    }

    this.data[0] = item
  }
  insertAt(item: T, idx: number): void {
    if (idx === 0) return this.prepend(item)
    if (idx === this.length - 1) return this.append(item)

    this.length++
    this.resize()
    for (let i = this.length - 1; i > idx; i--) {
      this.data[i] = this.data[i - 1]
    }
    this.data[idx] = item
  }
  append(item: T): void {
    this.data[this.length] = item
    this.length++
    this.resize()
  }
  remove(item: T): T | undefined {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === item) return this.removeAt(i)
    }

    return undefined
  }
  get(idx: number): T | undefined {
    return this.data[idx]
  }
  removeAt(idx: number): T | undefined {
    const out = this.data[idx]
    if (!out) return undefined

    for (let i = idx; i < this.length; i++) {
      this.data[i] = this.data[i + 1]
    }

    this.length--
    return out
  }

  private resize(): void {
    if (this.length < this.capacity) return

    this.capacity *= 2
    const data = this.data
    this.data = new Array(this.capacity)

    for (let i = 0; i < this.length; i++) {
      this.data[i] = data[i]
    }
  }
}
