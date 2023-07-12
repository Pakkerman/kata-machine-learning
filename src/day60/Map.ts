type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private store: Array<Bucket<T, V>>
  constructor() {
    this.length = 0
    this.capacity = 3
    this.store = Array.from({ length: this.capacity }, () => [] as Bucket<T, V>)
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) return bucket[i].value
    }
    return undefined
  }
  set(key: T, value: V): void {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        this.store[hash][i].value = value
        return
      }
    }

    this.store[hash].push({ key, value })
    this.length++
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    if (bucket.length === 0) return undefined
    let idx = -1
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) idx = i
    }

    if (idx === -1) return undefined
    const out = bucket[idx].value
    this.length--
    this.store[hash] = bucket.filter((_, i) => idx !== i)
    return out
  }
  size(): number {
    return this.length
  }

  private hash(input: T): number {
    return (
      input
        .toString()
        .split("")
        .map((item) => item.charCodeAt(0) + 7)
        .reduce((a, b) => a + b) % this.capacity
    )
  }

  private resize(): void {
    if (this.length < this.capacity) return

    const data = this.store
    this.store = Array.from(
      { length: (this.capacity *= 2) },
      () => [] as Bucket<T, V>
    )

    for (let i = 0; i < data.length; i++) {
      const bucket = data[i]
      for (let k = 0; k < bucket.length; k++) {
        const item = bucket[k]
        const hash = this.hash(item.key)
        this.store[hash].push(item)
      }
    }
  }
}
