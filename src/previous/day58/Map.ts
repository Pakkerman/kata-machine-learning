type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private store: Array<Bucket<T, V>>
  constructor() {
    this.length = 0
    this.capacity = 3
    this.store = Array.from({ length: this.capacity }, () => [])
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    return this.store[hash].find((item) => item.key === key)?.value
  }
  set(key: T, value: V): void {
    this.length++
    this.resize()
    const hash = this.hash(key)
    const item = { key, value }

    if (this.store[hash].findIndex((item) => item.key === key) !== -1) return
    else this.store[hash].push(item)
    console.log(this.store)
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const out = this.store[hash].find((item) => (item.key = key))?.value
    if (!out) return undefined
    this.length--

    this.store[hash] = this.store[hash].filter((item) => item.key !== key)
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
        .map((char) => char.charCodeAt(0))
        .reduce((a, b) => a + b) % this.capacity
    )
  }

  private resize(): void {
    if (this.length <= this.capacity) return
    this.capacity *= 2
    const store = this.store
    this.store = Array.from({ length: this.capacity }, () => [])

    for (let i = 0; i < store.length; i++) {
      const bucket = this.store[i]
      for (let k = 0; k < bucket.length; k++) {
        const hash = this.hash(bucket[k].key)
        this.store[hash].push(bucket[i])
      }
    }
  }
}
