type Node<T> = {
    value: T
    next?: Node<T>
    prev?: Node<T>
}

export default class LRU<K, V> {
    private length: number
    private head?: Node<V>
    private tail?: Node<V>
    private capacity: number
    private lookup: Map<K, Node<V>>
    private reverseLookup: Map<Node<V>, K>

    constructor(capacity: number = 10) {
        this.length = 0
        this.head = this.tail = undefined
        this.capacity = capacity
        this.lookup = new Map<K, Node<V>>()
        this.reverseLookup = new Map<Node<V>, K>()
    }

    update(key: K, value: V): void {
        const node = this.lookup.get(key)
        if (!node) {
            const node: Node<V> = { value }
            this.length++
            this.trimCache()

            this.prepend(node)

            this.lookup.set(key, node)
            this.reverseLookup.set(node, key)
        } else {
            node.value = value
            this.detach(node)
            this.prepend(node)
        }
    }
    get(key: K): V | undefined {
        const node = this.lookup.get(key)
        if (!node) return undefined
        const out = node.value

        this.detach(node)
        this.prepend(node)

        return out
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
    private trimCache() {
        if (this.length <= this.capacity || !this.tail) return

        const node = this.tail
        this.tail = this.tail.prev
        const key = this.reverseLookup.get(node) as K

        this.detach(node)

        this.lookup.delete(key)
        this.reverseLookup.delete(node)
        this.length--
    }
}
