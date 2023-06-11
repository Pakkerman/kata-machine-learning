// The shape of the table
// Table >> [
// [[key, value], [key, value], [key, value]...],
// [[key, value], [key, value]],
// [[key, value]],
// ...
// ]
// When set() the key will first come through hash function and put into the according
// bucket. Each bucket is an array of [key, value] pairs

export default class Map<T extends string | number, V> {
  private length: number
  private capacity: number
  private table: Array<Array<[T, V]>>

  constructor(capacity: number = 1) {
    this.length = 0
    this.capacity = capacity
    this.table = []
    for (let i = 0; i < this.capacity; i++) {
      this.table.push([])
    }
  }

  get(key: T): V | undefined {
    const hash = this.hash(key)
    const out = this.table[hash].filter((item) => item[0] === key)

    return out.length ? out[0][1] : undefined
  }
  set(key: T, value: V): void {
    this.length++
    this.checkLoad()
    const hash = this.hash(key)
    this.table[hash].push([key, value])

    // console.log(this.table)
  }
  delete(key: T): V | undefined {
    const hash = this.hash(key)
    const out = this.table[hash].filter((item) => item[0] === key)
    if (out.length === 0) return undefined
    this.table[hash] = this.table[hash].filter((item) => item[0] !== key)
    this.length--
    return out[0][1]
  }
  size(): number {
    return this.length
  }

  private hash(input: T): number {
    // Turn input into numbers and mod capacity
    if (typeof input === "number") return input % this.capacity
    let charCode = 0
    for (let i = 0; i < input.length; i++) {
      charCode += input.charCodeAt(i)
    }
    return charCode % this.capacity
  }

  private checkLoad(): void {
    // Reinitialize the table with new capacity, and rehash all items into the the new
    // table
    if (this.length < this.capacity) return

    this.capacity *= 2
    const old = this.table
    this.table = []

    for (let i = 0; i < this.capacity; i++) {
      this.table.push([])
    }

    for (let i = 0; i < old.length; i++) {
      for (let k = 0; k < old[i].length; k++) {
        const key = old[i][k][0]
        const hash = this.hash(key)
        const value = old[i][k][1]

        this.table[hash].push([key, value])
      }
    }
  }
}
