type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private store: Array<Bucket<T, V>>
  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.store = Array.from({ length: this.capacity }, () => [])
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return bucket[i].value
      }
    }
    return undefined
  }

  set(key: T, value: V): void {
    const hash = this.hash(key)
    const bucket = this.store[hash]
    const item = { key, value }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i] = item
        return
      }
    }

    this.length++
    this.resize()
    this.store[this.hash(key)].push(item)
  }

  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        const out = bucket[i].value
        this.length--
        bucket[i] = bucket[bucket.length - 1]
        bucket.pop()
        return out
      }
    }

    return undefined
  }

  size(): number {
    return this.length
  }

  private hash(key: T): number {
    return (
      key
        .toString()
        .split("")
        .reduce((acc, curr) => acc + curr.charCodeAt(0) + 7, 0) % this.capacity
    )
  }

  private resize(): void {
    if (this.length < this.capacity) return

    const store = this.store
    this.store = Array.from({ length: (this.capacity *= 2) }, () => [])
    for (let i = 0; i < store.length; i++) {
      const bucket = store[i]
      for (let k = 0; k < bucket.length; k++) {
        const item = bucket[k]
        const hash = this.hash(item.key)
        this.store[hash].push(item)
      }
    }
  }
}
