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
        this.head = this.tail = undefined
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
        if (idx === 0) return this.prepend(item)
        if (idx === this.length - 1) return this.append(item)

        const curr = this.getNode(idx)
        if (!curr) throw new Error("Idx out of range")
        const node = this.createNode(item)

        this.length++
        node.prev = curr.prev
        node.next = curr
        curr.prev = node
        if (node.prev) node.prev.next = node
    }
    append(item: T): void {
        const node = this.createNode(item)
        this.length++
        if (!this.tail) {
            this.head = this.tail = node
            return
        }
        node.prev = this.tail
        this.tail.next = node
        this.tail = node
    }
    remove(item: T): T | undefined {
        let curr = this.head
        if (!curr) return undefined
        let idx = -1
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
                idx = i
                break
            }
            curr = curr.next
        }

        if (idx === -1) return undefined
        return this.removeAt(idx)
    }
    get(idx: number): T | undefined {
        return this.getNode(idx)?.value
    }
    removeAt(idx: number): T | undefined {
        const curr = this.getNode(idx)
        if (!curr) return undefined
        this.length--
        const out = curr.value

        if (this.length === 0) {
            this.head = this.tail = undefined
            return out
        }

        if (curr.prev) curr.prev.next = curr.next
        if (curr.next) curr.next.prev = curr.prev
        if (curr === this.head) this.head = curr.next
        if (curr === this.tail) this.tail = curr.prev
        return out
    }

    private getNode(idx: number): Node<T> | undefined {
        let curr: Node<T> | undefined = this.head
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next
        }
        return curr
    }
    private createNode<T>(value: T): Node<T> {
        return { value }
    }
}
