type Item<K, V> = {
  key: K
  value: V
}

type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  public length: number
  public capacity: number
  public store: Array<Bucket<T, V>>
  constructor() {
    this.length = 0
    this.capacity = 5
    this.store = new Array(this.capacity)
    for (let i = 0; i < this.capacity; i++) {
      this.store[i] = []
    }
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
    this.length++
    const hash = this.hash(key)
    const item = { key, value }
    this.store[hash].push(item)
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const bucket = this.store[hash]

    let out
    const updateBucket = []
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) out = bucket[i].value
      else updateBucket.push(bucket[i])
    }

    if (out) this.length--
    this.store[hash] = updateBucket
    return out
  }
  size(): number {
    console.log(this.store)
    return this.length
  }

  private hash(key: T): number {
    const str = key.toString()

    let sum: number = 0
    for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i)
    }

    return sum % this.capacity
  }
}
