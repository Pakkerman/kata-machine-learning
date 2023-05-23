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
    private keyLookup: Map<K, Node<V>>
    private nodeLookup: Map<Node<V>, K>

    constructor(cap: number = 10) {
        this.length = 0
        this.capacity = cap
        this.head = this.tail = undefined
        this.keyLookup = new Map<K, Node<V>>()
        this.nodeLookup = new Map<Node<V>, K>()
    }

    update(key: K, value: V): void {
        const node = this.keyLookup.get(key)
        if (!node) {
            const node: Node<V> = { value }
            this.length++
            this.trim()
            this.prepend(node)

            this.keyLookup.set(key, node)
            this.nodeLookup.set(node, key)
        } else {
            node.value = value
            this.detach(node)
            this.prepend(node)
        }
    }
    get(key: K): V | undefined {
        const node = this.keyLookup.get(key)
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
        if (this.length <= this.capacity) return
        if (!this.tail) return

        const tail = this.tail
        this.tail = this.tail.prev
        const key = this.nodeLookup.get(tail) as K

        this.keyLookup.delete(key)
        this.nodeLookup.delete(tail)

        this.length--
    }
}
