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
        this.length++
        const node = this.createNode(item)
        if (!this.head) {
            this.head = this.tail = node
            return
        }
        node.next = this.head
        this.head.prev = node
        this.head = node
    }
    insertAt(item: T, idx: number): void {
        const curr = this.getNode(idx)
        if (!curr) throw new Error("index Out of range")

        this.length++
        const node = this.createNode(item)

        node.next = curr
        node.prev = curr.prev
        curr.prev = node
        if (node.prev) node.prev.next = node
    }
    append(item: T): void {
        this.length++
        const node = this.createNode(item)
        if (!this.tail) {
            this.head = this.tail = node
            return
        }

        this.tail.next = node
        node.prev = this.tail
        this.tail = node
    }
    remove(item: T): T | undefined {
        let curr: Node<T> | undefined = this.head
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
                break
            }
            curr = curr.next
        }
        if (!curr) return undefined

        return this.removeNode(curr)
    }
    get(idx: number): T | undefined {
        return this.getNode(idx)?.value
    }
    removeAt(idx: number): T | undefined {
        const curr = this.getNode(idx)
        if (!curr) return undefined
        return this.removeNode(curr)
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--
        if (this.length === 0) {
            this.head = this.tail = undefined
            return node.value
        }

        if (node.prev) node.prev.next = node.next
        if (node.next) node.next.prev = node.prev
        if (node === this.head) this.head = this.head.next
        if (node === this.tail) this.tail = this.tail.prev

        return node.value
    }

    private getNode(idx: number): Node<T> | undefined {
        let curr = this.head
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next
        }

        return curr
    }

    private createNode(value: T): Node<T> {
        return { value }
    }
}
