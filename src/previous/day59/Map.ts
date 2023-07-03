type Item<K, V> = { key: K; value: V }
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private store: Array<Bucket<T, V>>
  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.store = Array.from({ length: capacity }, () => [])
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]
    let out: V | undefined = undefined

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) out = bucket[i].value
    }

    return out
  }
  set(key: T, value: V): void {
    const hash = this.hash(key)
    this.length++
    this.resize()

    for (let i = 0; i < this.store[hash].length; i++) {
      if (this.store[hash][i].key === key) return
    }

    this.store[hash].push({ key, value })
  }
  delete(key: T): V | undefined {
    let out: V | undefined = undefined
    const hash = this.hash(key)
    const newBucket = []
    for (let i = 0; i < this.store[hash].length; i++) {
      if (this.store[hash][i].key === key) {
        out = this.store[hash][i].value
        break
      }
      newBucket[i] = this.store[hash][i]
    }

    if (!out) return out

    this.store[hash] = newBucket
    console.log(this.store, out)
    this.length--
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
        .map((char) => char.charCodeAt(0) + 7)
        .reduce((a, b) => a + b) % this.capacity
    )
  }
  private resize(): void {
    if (this.length < this.capacity) return
    const store = this.store
    this.capacity *= 2
    this.store = Array.from({ length: this.capacity }, () => [])

    for (let i = 0; i < store.length; i++) {
      const bucket = store[i]
      for (let k = 0; k < bucket.length; k++) {
        const hash = this.hash(bucket[k].key)
        this.store[hash].push(bucket[k])
      }
    }
    console.log(store, this.store)
  }
}
