type Node<T> = {
    value: T
    next?: Node<T>
    prev?: Node<T>
}

export default class LRU<K, V> {
    private length: number
    private head?: Node<V>
    private tail?: Node<V>
    private lookup: Map<K, Node<V>>
    private reverseLookup: Map<Node<V>, K>

    constructor(private captacity: number = 10) {
        this.length = 0
        this.lookup = new Map<K, Node<V>>()
        this.reverseLookup = new Map<Node<V>, K>()
    }

    update(key: K, value: V): void {
        const node = this.lookup.get(key)
        if (!node) {
            const node = this.createNode(value)
            this.length++
            this.prepend(node)
            this.trim()

            this.lookup.set(key, node)
            this.reverseLookup.set(node, key)

            return
        }
        node.value = value
        this.prepend(node)
    }
    get(key: K): V | undefined {
        const node = this.lookup.get(key)
        if (!node) return undefined

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
        this.detach(node)

        if (!this.head) {
            this.tail = this.head = node
            return
        }

        node.next = this.head
        this.head.prev = node
        this.head = node
    }
    private trim(): void {
        if (this.length <= this.captacity) return

        const node = this.tail
        if (!node) return
        this.detach(node)
        const key = this.reverseLookup.get(node) as K

        this.lookup.delete(key)
        this.reverseLookup.delete(node)

        this.length--
    }
}
