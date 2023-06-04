type Node<T> = {
    value: T
    prev?: Node<T>
    next?: Node<T>
}

export default class DoublyLinkedList<T> {
    public length: number
    private head?: Node<T>
    private tail?: Node<T>

    constructor() {
        this.length = 0
        this.head = this.tail = undefined
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item }
        this.length++
        if (!this.head) {
            this.head = this.tail = node
            return
        }

        node.next = this.head
        this.head.prev = node
        this.head = node
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) return this.prepend(item)
        if (idx === this.length - 1) return this.append(item)

        const curr = this.getNode(idx)
        if (!curr) return
        const node: Node<T> = { value: item }
        this.length++

        node.next = curr
        node.prev = curr.prev
        curr.prev = node
        if (node.prev) node.prev.next = node
    }
    append(item: T): void {
        const node: Node<T> = { value: item }

        this.length++
        if (!this.tail) {
            this.head = this.tail = node
            return
        }

        this.tail.next = node
        node.prev = this.tail
        this.tail = node
    }
    remove(item: T): T | undefined {
        let curr = this.head
        for (let i = 0; i < this.length && curr; i++) {
            if (curr.value === item) {
                this.length--
                return this.removeNode(curr)
            }

            curr = curr.next
        }
        return undefined
    }
    get(idx: number): T | undefined {
        return this.getNode(idx)?.value
    }
    removeAt(idx: number): T | undefined {
        const curr = this.getNode(idx)
        if (!curr) return undefined
        this.length--
        return this.removeNode(curr)
    }

    private getNode(idx: number): Node<T> | undefined {
        if (idx < 0 || this.length <= idx) return undefined
        let curr = this.head
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next
        }
        return curr
    }
    private removeNode(node: Node<T>): T {
        if (node.next) node.next.prev = node.prev
        if (node.prev) node.prev.next = node.next
        if (node === this.head) this.head = this.head.next
        if (node === this.tail) this.tail = this.tail.prev
        node.next = node.prev = undefined
        return node.value
    }
}
