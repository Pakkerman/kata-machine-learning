type Node<V> = {
    value: V
    prev?: Node<V>
    next?: Node<V>
}

export default class LRU<K, V> {
    private length: number
    private capacity: number
    private head?: Node<V>
    private tail?: Node<V>
    private lookup: Map<K, Node<V>>
    private rLookup: Map<Node<V>, K>

    constructor(capacity: number = 10) {
        this.length = 0
        this.capacity = capacity
        this.head = this.tail = undefined
        this.lookup = new Map()
        this.rLookup = new Map()
    }

    update(key: K, value: V): void {
        const node = this.lookup.get(key)
        if (!node) {
            const node: Node<V> = { value }
            this.prepend(node)
            this.length++
            this.trim()

            this.lookup.set(key, node)
            this.rLookup.set(node, key)
        } else {
            node.value = value
            this.detach(node)
            this.prepend(node)
        }
    }
    get(key: K): V | undefined {
        const node = this.lookup.get(key)
        if (!node) return undefined

        this.detach(node)
        this.prepend(node)

        return node.value
    }

    private detach(node: Node<V>): void {
        if (node.next) node.next.prev = node.prev
        if (node.prev) node.prev.next = node.next
        if (node === this.head) this.head = this.head.next
        if (node === this.tail) this.tail = this.tail.prev
        node.next = node.prev = undefined
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
        if (!this.tail || this.length <= this.capacity) return

        const tail = this.tail
        const key = this.rLookup.get(tail) as K

        this.lookup.delete(key)
        this.rLookup.delete(tail)

        this.detach(tail)
        this.length--
    }
}
