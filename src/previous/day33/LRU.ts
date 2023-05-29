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
    private reverseLookup: Map<Node<V>, K>

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
            const node: Node<V> = { value }
            this.prepend(node)
            this.length++
            this.trim()

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

        this.detach(node)
        this.prepend(node)

        return node.value
    }

    private detach(node: Node<V>): void {
        if (node.next) {
            node.next.prev = node.prev
        }
        if (node.prev) {
            node.prev.next = node.next
        }
        if (node === this.head) {
            this.head = this.head.next
        }
        if (node === this.tail) {
            this.tail = this.tail.prev
        }
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

        const node = this.tail
        this.tail = this.tail.prev
        const key = this.reverseLookup.get(node) as K

        this.lookup.delete(key)
        this.reverseLookup.delete(node)

        this.length--
    }

    private print(): void {
        // let curr = this.head
        // const out = []
        // for (let i = 0; curr && this.length; i++) {
        //     out.push(curr.value)
        //     curr = curr.next
        // }
        console.log(this.lookup)
    }
}
