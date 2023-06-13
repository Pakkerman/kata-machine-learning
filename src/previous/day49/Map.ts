type Item<T, V> = {
  key?: T
  value?: V
}

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private store: Item<T, V>[][]
  constructor(capacity: number = 5) {
    this.length = 0
    this.capacity = capacity
    this.store = []
    for (let i = 0; i < this.capacity; i++) {
      this.store.push(new Array().fill(null))
    }
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    const data = this.store[hash]
    const out = data.filter((item) => item.key === key)
    if (out.length === 0) return undefined

    return out[0].value
  }
  set(key: T, value: V): void {
    const item = { key, value }
    this.length++

    const hash = this.hash(key)
    this.store[hash].push(item)
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const row = this.store[hash]
    const item = row.filter((item) => item.key === key)
    if (item.length === 0) return undefined
    this.length--

    this.store[hash] = row.filter((item) => item.key !== key)
    return item[0].value
  }
  size(): number {
    return this.length
  }

  private hash(input: T): number {
    if (typeof input === "number") return input % this.capacity

    let sum = 0
    for (let i = 0; i < input.length; i++) {
      sum += input.charCodeAt(i)
    }

    return sum % this.capacity
  }
}
