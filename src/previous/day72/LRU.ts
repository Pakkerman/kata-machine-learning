type Node<V> = {
  value: V
  next?: Node<V>
  prev?: Node<V>
}

export default class LRU<K, V> {
  private length: number
  private capacity: number
  private head?: Node<V>
  private tail?: Node<V>
  private nodeMap: Map<K, Node<V>>
  private keyMap: Map<Node<V>, K>

  constructor(capacity: number = 3) {
    this.length = 0
    this.capacity = capacity
    this.head = undefined
    this.tail = undefined
    this.nodeMap = new Map()
    this.keyMap = new Map()
  }

  update(key: K, value: V): void {
    const node = this.nodeMap.get(key)
    if (!node) {
      const node: Node<V> = { value }
      this.prepend(node)
      this.length++
      this.trim()

      this.nodeMap.set(key, node)
      this.keyMap.set(node, key)
    } else {
      node.value = value
      this.detach(node)
      this.prepend(node)
    }
  }
  get(key: K): V | undefined {
    const node = this.nodeMap.get(key)
    if (!node) return undefined

    this.detach(node)
    this.prepend(node)
    return node.value
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
  private detach(node: Node<V>): void {
    if (node.next) node.next.prev = node.prev
    if (node.prev) node.prev.next = node.next
    if (node === this.head) this.head = this.head.next
    if (node === this.tail) this.tail = this.tail.prev
  }
  private trim(): void {
    if (this.length <= this.capacity) return
    if (!this.tail) return

    const tail = this.tail
    const key = this.keyMap.get(tail) as K

    this.nodeMap.delete(key)
    this.keyMap.delete(tail)

    this.detach(tail)
    this.length--
  }
}
