type Node<V> = {
    value: V
    prev?: Node<V>
    next?: Node<V>
}

export default class LRU<K, V> {
    private length: number
    private head?: Node<V>
    private tail?: Node<V>
    private lookup: Map<K, Node<V>>
    private reverseLookup: Map<Node<V>, K>

    constructor(private capacity: number = 10) {
        this.length = 0
        this.head = this.tail = undefined
        this.lookup = new Map<K, Node<V>>()
        this.reverseLookup = new Map<Node<V>, K>()
    }

    update(key: K, value: V): void {
        const node = this.lookup.get(key)
        if (!node) {
            // create node and prepend to the front and trim if needed
            const node = this.createNode(value)
            this.length++
            this.prepend(node)
            this.trimCache()

            this.lookup.set(key, node)
            this.reverseLookup.set(node, key)

            // update map
        } else {
            // find node, detach and prepend to the front
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

    private createNode(value: V): Node<V> {
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
        if (!this.head) {
            this.head = this.tail = node
            return
        }

        node.next = this.head
        this.head.prev = node
        this.head = node
    }

    private trimCache(): void {
        if (this.length <= this.capacity || !this.tail) return

        const tail = this.tail
        const key = this.reverseLookup.get(tail) as K
        this.detach(tail)

        this.lookup.delete(key)
        this.reverseLookup.delete(tail)

        this.length--
    }
}
