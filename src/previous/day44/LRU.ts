type Node<T> = {
    value: T
    prev?: Node<T>
    next?: Node<T>
}

export default class LRU<K, V> {
    private length: number
    private capacity: number
    private head?: Node<V>
    private tail?: Node<V>
    private lookup: Map<K, Node<V>>
    private reverse: Map<Node<V>, K>

    constructor(capacity: number = 10) {
        this.length = 0
        this.capacity = capacity
        this.head = this.tail = undefined
        this.lookup = new Map()
        this.reverse = new Map()
    }

    update(key: K, value: V): void {
        const node = this.lookup.get(key)
        if (!node) {
            const node: Node<V> = { value }
            this.length++
            this.trim()

            this.lookup.set(key, node)
            this.reverse.set(node, key)
        } else {
            node.value = value
            this.prepend(node)
        }
    }
    get(key: K): V | undefined {
        const node = this.lookup.get(key)
        if (!node) return undefined

        this.prepend(node)

        return node.value
    }
    detach(node: Node<V>): void {
        if (node.next) node.next.prev = node.prev
        if (node.prev) node.prev.next = node.next
        if (node === this.head) this.head = this.head.next
        if (node === this.tail) this.tail = this.tail.prev
        node.next = undefined
        node.prev = undefined
    }
    prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node
            return
        }
        this.detach(node)
        node.next = this.head
        this.head.prev = node
        this.head = node
    }
    trim(): void {
        if (this.length <= this.capacity || !this.tail) return

        const tail = this.tail
        const key = this.reverse.get(tail) as K

        this.lookup.delete(key)
        this.reverse.delete(tail)

        this.detach(tail)
        this.length--
    }
}
