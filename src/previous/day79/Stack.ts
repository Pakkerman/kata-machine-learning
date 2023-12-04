type Node<T> = {
  value: T
  prev?: Node<T>
}

export default class Stack<T> {
  public length: number
  private head?: Node<T>
  private tail?: Node<T>

  constructor() {
    this.length = 0
    this.head = this.tail = undefined
  }

  push(item: T): void {
    const node = { value: item } as Node<T>
    this.length++
    if (!this.tail) {
      this.head = this.tail = node
      return
    }

    node.prev = this.tail
    this.tail = node
  }
  pop(): T | undefined {
    if (!this.tail) return undefined
    const out = this.tail.value
    this.length--
    if (!this.length) {
      this.head = this.tail = undefined
      return out
    }

    this.tail = this.tail.prev
    return out
  }
  peek(): T | undefined {
    return this.head?.value
  }
}