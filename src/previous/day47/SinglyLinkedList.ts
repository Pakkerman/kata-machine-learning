type Node<T> = {
  item: T
  next?: Node<T>
}

export default class SinglyLinkedList<T> {
  public length: number
  private head?: Node<T>
  private tail?: Node<T>

  constructor() {
    this.length = 0
    this.head = this.tail = undefined
  }

  prepend(item: T): void {
    const node: Node<T> = { item }
    this.length++
    if (!this.head) {
      this.head = this.tail = node
      return
    }

    node.next = this.head
    this.head = node
  }
  insertAt(item: T, idx: number): void {
    if (idx === 0) return this.prepend(item)
    if (idx === this.length - 1) return this.append(item)

    const curr = this.getNode(idx)
    if (!curr) return
    const node: Node<T> = { item }
    this.length++

    node.next = curr.next
    curr.next = node

    node.item = curr.item
    curr.item = item
  }

  append(item: T): void {
    const node: Node<T> = { item }
    this.length++
    if (!this.tail) {
      this.head = this.tail = node
      return
    }

    this.tail.next = node
    this.tail = node
  }
  remove(item: T): T | undefined {
    let curr = this.head
    for (let i = 0; i < this.length && curr; i++) {
      if (curr.item === item) return this.removeAt(i)
      curr = curr.next
    }
    return undefined
  }
  get(idx: number): T | undefined {
    return this.getNode(idx)?.item
  }
  removeAt(idx: number): T | undefined {
    const curr = this.getNode(idx)
    if (!curr) return undefined
    const out = curr.item
    this.length--

    if (this.length === 0) {
      this.head = this.tail = undefined
      return out
    }

    if (curr === this.head) this.head = this.head.next
    if (curr === this.tail) this.tail = this.getNode(idx - 1)
    if (curr.next === this.tail) this.tail = curr
    if (curr.next) {
      curr.item = curr.next.item
      curr.next = curr.next.next
    }

    return out
  }

  private getNode(idx: number): Node<T> | undefined {
    let curr = this.head
    for (let i = 0; i < idx && curr; i++) {
      curr = curr.next
    }

    return curr
  }
}
