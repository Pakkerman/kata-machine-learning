type Item<K, V> = {
  key: K
  value: V
}

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
    const bucket = this.store[hash]

    let out
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) out = bucket[i].value
    }

    return out
  }
  set(key: T, value: V): void {
    const item = { key, value }
    this.length++

    const hash = this.hash(key)
    this.store[hash].push(item)
  }
  delete(key: T): V | undefined {
    let out

    const hash = this.hash(key)
    const bucket = this.store[hash]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) out = bucket[i].value
    }

    if (!out) return undefined

    this.length--
    const newBucket = []
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key !== key) newBucket.push(bucket[i])
    }

    this.store[hash] = newBucket
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
        .map((item) => item.charCodeAt(0))
        .reduce((a, b) => a + b) % this.capacity
    )
  }
}
