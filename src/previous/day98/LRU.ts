type Node<T> = {
  value: T
  next?: Node<T>
  prev?: Node<T>
}

export default class LRU<K, V> {
  private length: number
  private capacity: number
  private head?: Node<V>
  private tail?: Node<V>
  private nodes: Map<K, Node<V>>
  private keys: Map<Node<V>, K>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.head = this.tail = undefined
    this.nodes = new Map()
    this.keys = new Map()
  }

  update(key: K, value: V): void {
    const node = this.nodes.get(key)
    if (!node) {
      const node: Node<V> = { value }
      this.prepend(node)
      this.length++
      this.trim()

      this.nodes.set(key, node)
      this.keys.set(node, key)
    } else {
      node.value = value
      this.detach(node)
      this.prepend(node)
    }
  }

  get(key: K): V | undefined {
    const node = this.nodes.get(key)
    if (!node) return undefined

    this.detach(node)
    this.prepend(node)
    return node.value
  }

  private detach(node: Node<V>): void {
    if (node.next) node.next.prev = node.prev
    if (node.prev) node.prev.next = node.next
    if (node === this.head) this.head.next = this.head.next
    if (node === this.tail) this.tail.next = this.tail.prev
  }
  private prepend(node: Node<V>): void {
    if (!this.head) {
      this.head = this.tail = node
      return
    }

    node.next = this.head
    this.head.prev = node
    this.head = node
  }
  private trim(): void {
    if (this.length <= this.capacity) return

    const tail = this.tail!
    const key = this.keys.get(tail) as K

    this.nodes.delete(key)
    this.keys.delete(tail)

    this.detach(tail)
    this.length--
  }
}

