type Item<K, V> = {
  key: K
  value: V
}
type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private store: Array<Bucket<T, V>>

  constructor(capacity: number = 10) {
    this.length = 0
    this.capacity = capacity
    this.store = new Array(this.capacity)
    for (let i = 0; i < this.capacity; i++) {
      const bucket: Bucket<T, V> = []
      this.store[i] = bucket
    }
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
    this.length++
    const hash = this.hash(key)
    const item = { key, value }
    this.store[hash].push(item)
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]
    const newBucket = []
    let out
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) newBucket.push(bucket[i])
      if (bucket[i].key === key) out = bucket[i].value
    }

    if (!out) return undefined

    this.length--
    this.store[hash] = newBucket
    return out
  }
  size(): number {
    return this.length
  }

  private hash(input: T): number {
    if (typeof input === "number") return input % this.capacity
    if (typeof input === "string")
      return input.charCodeAt(input.length - 1) % this.capacity

    return 0
  }
}
