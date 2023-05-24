type Node<T> = {
    value: T
    next?: Node<T>
}
function createNode<T>(value: T): Node<T> {
    return { value }
}

export default class SinglyLinkedList<T> {
    public length: number
    private head?: Node<T>
    private tail?: Node<T>

    constructor() {
        this.length = 0
        this.head = undefined
        this.tail = undefined
    }

    prepend(item: T): void {
        this.length++
        const node = createNode(item)
        if (!this.head) {
            this.head = this.tail = node
        }

        node.next = this.head
        this.head = node
    }
    insertAt(item: T, idx: number): void {}
    append(item: T): void {
        this.length++
        const node = createNode(item)

        if (!this.tail) {
            this.tail = this.head = node
            return
        }

        this.tail.next = node
        this.tail = node
    }
    remove(item: T): T | undefined {
        let curr = this.head
        let prev = this.head as Node<T>
        for (let i = 0; i < this.length && curr; i++) {
            if (curr.value === item) break
            prev = curr
            curr = curr.next
        }
        if (!curr) return undefined

        this.length--

        if (this.length === 0) {
            const out = curr.value
            this.head = this.tail = undefined
            return out
        }

        if (curr.value === item) {
            const out = curr.value
            this.head = curr.next
            return out
        }

        if (curr === this.tail) {
        }

        const out = prev.value

        return out
    }
    get(idx: number): T | undefined {
        if (idx >= this.length) return undefined
        const node = this.getNodeAt(idx)

        return node.value
    }
    removeAt(idx: number): T | undefined {
        // idx is larger than length
        if (idx >= this.length) return undefined
        this.length--
        // length is 0
        if (this.length === 0) {
            const out = this.head?.value
            this.head = this.tail = undefined
            return out
        }

        const node = this.getNodeAt(idx)
        if (node === this.head) {
            this.head = this.head.next
            return node.value
        }

        let prev = this.head as Node<T>
        for (let i = 0; i < idx - 1 && prev; i++) {
            prev = prev.next as Node<T>
        }

        if (prev === this.head) {
            prev.next = node.next
            this.head = prev
            return node.value
        }

        if (node === this.tail) {
            prev.next = undefined
            this.tail = prev
            return node.value
        }

        prev.next = node.next
        return node.value

        // idx is the head

        // if idx = length - 1
    }

    private getNodeAt(idx: number): Node<T> {
        let curr = this.head as Node<T>
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next as Node<T>
        }
        return curr
    }
}
