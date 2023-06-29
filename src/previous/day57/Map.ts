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
      if (bucket[i].key === key) return bucket[i].value
    }
    return undefined
  }
  set(key: T, value: V): void {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) return
    }

    this.length++
    this.resize()
    this.store[hash].push({ key, value })
    console.log(this.store)
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]
    let out: V | undefined = undefined

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        this.length--
        out = bucket[i].value
        this.store[hash] = bucket.filter((item) => item.key !== key)
      }
    }

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
    if (this.length < this.capacity) return

    this.capacity *= 2
    const store = this.store

    this.store = Array.from({ length: this.capacity }, () => [])
    for (let i = 0; i < this.capacity; i++) {
      const bucket = store[i]
      if (!bucket) continue
      for (let k = 0; k < bucket.length; k++) {
        const item = bucket[k]
        const hash = this.hash(item.key)
        this.store[hash].push(item)
      }
    }
    console.log("size grew")
  }
}
