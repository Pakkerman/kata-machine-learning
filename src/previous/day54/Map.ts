type Item<K, V> = {
  key: K
  value: V
}

type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private store: Array<Bucket<T, V>>

  constructor(capacity: number = 2) {
    this.length = 0
    this.capacity = capacity
    this.store = Array.from({ length: 10 }, () => [])
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]
    if (bucket.length === 0) return undefined

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) return bucket[i].value
    }

    return undefined
  }
  set(key: T, value: V): void {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    let idx = -1
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        idx = i
        break
      }
    }

    // No same key already in the bucket, push new item, or replace it
    if (idx === -1) {
      this.length++
      bucket.push({ key, value })
    } else {
      bucket[idx] = { key, value }
    }

    this.store[hash] = bucket
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    let idx = -1
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        idx = i
        break
      }
    }

    let out: V | undefined
    if (idx === -1) {
      return undefined
    } else {
      this.length--
      out = bucket[idx].value
    }

    this.store[hash] = bucket.filter((_, i) => i != idx)

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
