class Node<T> {
  public value: T
  public next?: Node<T>
  public prev?: Node<T>
  constructor(value: T) {
    this.value = value
    this.next = undefined
    this.prev = undefined
  }
}
export default class DoublyLinkedList<T> {
  public length: number
  private head?: Node<T>
  private tail?: Node<T>

  constructor() {
    this.length = 0
    this.head = this.tail = undefined
  }

  prepend(item: T): void {
    const node = new Node(item)
    this.length++

    if (!this.head) {
      this.head = this.tail = node
      return
    }

    node.next = this.head
    this.head.prev = node
    this.head = node
  }

  insertAt(item: T, idx: number): void {
    if (idx === 0) return this.prepend(item)
    if (idx === this.length - 1) return this.append(item)

    const curr = this.getNode(idx)
    if (!curr) return

    this.length++
    const node = new Node(item)

    node.next = curr
    node.prev = curr.prev
    curr.prev = node
    if (node.prev) {
      node.prev.next = node
    }
  }

  append(item: T): void {
    const node = new Node(item)
    this.length++

    if (!this.tail) {
      this.head = this.tail = node
      return
    }

    node.prev = this.tail
    this.tail.next = node
    this.tail = node
  }

  remove(item: T): T | undefined {
    let curr = this.head
    for (let i = 0; i < this.length && curr; i++) {
      if (curr.value === item) return this.removeAt(i)
      curr = curr.next
    }

    return undefined
  }

  get(idx: number): T | undefined {
    return this.getNode(idx)?.value
  }

  removeAt(idx: number): T | undefined {
    const curr = this.getNode(idx)
    if (!curr) return undefined

    const out = curr.value
    this.length--
    if (this.length === 0) {
      this.head = this.tail = undefined
      return out
    }

    if (curr.next) curr.next.prev = curr.prev
    if (curr.prev) curr.prev.next = curr.next
    if (curr === this.head) this.head = this.head.next
    if (curr === this.tail) this.tail = this.tail.prev

    return out
  }

  private getNode(idx: number): undefined | Node<T> {
    let curr = this.head
    for (let i = 0; i < idx && curr; i++) {
      curr = curr.next
    }

    return curr
  }
}

