// 29
type Node<T> = {
    value: T
    next?: Node<T>
    prev?: Node<T>
}

export default class LRU<K, V> {
    private length: number
    public capacity: number
    public head?: Node<V>
    public tail?: Node<V>
    public lookup: Map<K, Node<V>>
    public reverseLookup: Map<Node<V>, K>

    constructor(capacity: number = 10) {
        this.length = 0
        this.capacity = capacity
        this.head = this.tail = undefined
        this.lookup = new Map<K, Node<V>>()
        this.reverseLookup = new Map<Node<V>, K>()
    }

    update(key: K, value: V): void {
        const node = this.lookup.get(key)
        if (!node) {
            const node = this.create(value)
            this.length++
            this.trimCache()
            this.prepend(node)

            this.lookup.set(key, node)
            this.reverseLookup.set(node, key)
        } else {
            this.detach(node)
            this.prepend(node)
            node.value = value
        }
    }
    get(key: K): V | undefined {
        const node = this.lookup.get(key)
        if (!node) return undefined

        this.detach(node)
        this.prepend(node)

        return node.value
    }

    private create(value: V): Node<V> {
        return { value }
    }

    private detach(node: Node<V>): void {
        if (node.next) node.next.prev = node.prev
        if (node.prev) node.prev.next = node.next
        if (node === this.head) this.head = this.head.next
        if (node === this.tail) this.tail = this.tail.prev
        node.next = undefined
        node.prev = undefined
    }
    private prepend(node: Node<V>): void {
        // add the node to the front of the list
        if (!this.head) {
            this.head = this.tail = node
            return
        }

        node.next = this.head
        this.head.prev = node
        this.head = node
    }

    private trimCache() {
        if (this.length <= this.capacity || !this.tail) return

        const tail = this.tail
        this.detach(this.tail)
        const key = this.reverseLookup.get(tail) as K

        this.lookup.delete(key)
        this.reverseLookup.delete(tail)

        this.length--
    }
}
