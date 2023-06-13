import { HighlightSpanKind } from "typescript"

type Item<K, V> = {
  key: K
  value: V
}

type Row<K, V> = Array<Item<K, V>>

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private store: Array<Row<T, V>>

  constructor(capacity: number = 1) {
    this.length = 0
    this.capacity = capacity
    this.store = new Array(this.capacity).fill([])
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    const dataRow = this.store[hash]
    for (let i = 0; i < dataRow.length; i++) {
      if (dataRow[i].key === key) return dataRow[i].value
    }

    return undefined
  }
  set(key: T, value: V): void {
    this.length++
    this.grow()
    const hash = this.hash(key)
    this.store[hash].push({ key, value })
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const dataRow = this.store[hash]
    if (dataRow.length === 0) return undefined

    let out = undefined
    for (let i = 0; i < dataRow.length; i++) {
      if (dataRow[i].key === key) out = dataRow[i].value
    }

    if (!out) return undefined

    this.length--
    const newData: Row<T, V> = []
    for (let i = 0; i < dataRow.length; i++) {
      if (dataRow[i].key !== key) newData.push(dataRow[i])
    }

    this.store[hash] = newData
    return out
  }
  size(): number {
    console.log(this.store)
    return this.length
  }

  private hash(input: T) {
    if (typeof input === "number") return input % this.capacity

    return input.charCodeAt(input.length - 1) % this.capacity
  }

  private grow(): void {
    if (this.length <= this.capacity) return

    const data = this.store
    this.capacity *= 2
    this.store = new Array(this.capacity)
    for (let i = 0; i < this.capacity; i++) {
      this.store[i] = []
    }

    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].length; k++) {
        const value = data[i][k].value
        const key = data[i][k].key
        const hash = this.hash(key)
        this.store[hash].push({ key, value })
      }
    }
  }
}
