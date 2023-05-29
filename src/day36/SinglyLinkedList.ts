type Node<T> = {
    value: T
    next?: Node<T>
}

export default class SinglyLinkedList<T> {
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
        this.head = node
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) return this.prepend(item)
        if (idx === this.length - 1) return this.append(item)

        const curr = this.getNode(idx)
        if (!curr) return
        const node: Node<T> = { value: item }
        this.length++

        node.next = curr.next
        curr.next = node

        node.value = curr.value
        curr.value = item
    }

    append(item: T): void {
        const node: Node<T> = { value: item }
        this.length++
        if (!this.tail) {
            this.head = this.tail = node
            return
        }

        this.tail.next = node
        this.tail = node
    }
    remove(item: T): T | undefined {
        let curr = this.head
        for (let i = 0; i < this.length && curr; i++) {
            if (curr.value === item) return this.removeAt(i)
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

        const out = curr.value
        this.length--
        if (this.length === 0) {
            this.head = this.tail = undefined
            return out
        }

        if (curr === this.head) this.head = this.head.next
        if (curr === this.tail) this.tail = this.getNode(idx - 1)
        if (curr.next === this.tail) this.tail = curr
        if (curr.next) {
            curr.value = curr.next.value
            curr.next = curr.next.next
        }

        return out
    }

    private getNode(idx: number): Node<T> | undefined {
        if (idx < 0 || this.length <= idx) return undefined
        let curr = this.head
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next
        }
        return curr
    }
}
