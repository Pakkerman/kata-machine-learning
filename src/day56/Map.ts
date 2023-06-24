type Item<K, V> = {
  key: K
  value: V
}

type Bucket<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  public length: number
  private capacity: number
  private store: Array<Bucket<T, V>>
  constructor(capacity: number = 1) {
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
    const item = { key, value }
    this.length++
    this.resize()
    const hash = this.hash(key)
    const bucket = this.store[hash]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) return
    }

    this.store[hash].push(item)
    console.log(this.store)
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

    if (idx === -1) return undefined
    const out = bucket[idx].value
    this.length--

    for (let i = idx; i < bucket.length; i++) {
      this.store[hash][i] = this.store[hash][i + 1]
    }
    this.store[hash].pop()
    console.log(this.store)
    return out
  }
  size(): number {
    console.log(this.store)
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

    for (let i = 0; i < store.length; i++) {
      for (let k = 0; k < store[i].length; k++) {
        const hash = this.hash(store[i][k].key)
        this.store[hash].push(store[i][k])
      }
    }
    console.log("resize to >>", this.capacity)
  }
}
