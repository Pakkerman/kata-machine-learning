type Node<T> = {
    value: T
    next?: Node<T>
    prev?: Node<T>
}

export default class DoublyLinkedList<T> {
    public length: number
    private head?: Node<T>
    private tail?: Node<T>

    constructor() {
        this.length = 0
        this.head = undefined
        this.tail = undefined
    }

    prepend(item: T): void {
        const node = this.createNode(item)
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
        const curr = this.getAt(idx)
        if (!curr) throw new Error("Index is out of range")
        const node = this.createNode(item)
        this.length++

        node.next = curr
        node.prev = curr.prev
        curr.prev = node
        if (node.prev) node.prev.next = node
    }
    append(item: T): void {
        const node = this.createNode(item)
        this.length++

        if (!this.tail) {
            this.head = this.tail = node
        }

        node.prev = this.tail
        this.tail.next = node
        this.tail = node
    }
    remove(item: T): T | undefined {
        let curr = this.head
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
                return this.removeNode(curr)
            }
            curr = curr.next
        }

        return undefined
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value
    }
    removeAt(idx: number): T | undefined {
        if (!this.head) return undefined

        const curr = this.getAt(idx)
        return this.removeNode(curr)
    }

    private getAt(idx: number): Node<T> {
        let curr = this.head
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next
        }
        return curr as Node<T>
    }

    private removeNode(node: Node<T>): T {
        this.length--
        const out = node.value
        if (this.length === 0) {
            this.tail = this.head = undefined
            return out
        }
        if (node.prev) node.prev.next = node.next
        if (node.next) node.next.prev = node.prev
        if (node === this.head) this.head = node.next
        if (node === this.tail) this.tail = node.prev
        return out
    }

    private createNode<T>(value: T): Node<T> {
        return { value }
    }
}
