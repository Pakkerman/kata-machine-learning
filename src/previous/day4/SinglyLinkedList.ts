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
        this.head = node
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            this.prepend(item)
            return
        }
        if (idx === this.length - 1) {
            this.append(item)
            return
        }
        const curr = this.getNode(idx)
        if (!curr) throw new Error("Index out of range")
        const node = this.createNode(curr.value)
        this.length++

        node.next = curr.next
        curr.next = node
        curr.value = item
    }
    append(item: T): void {
        const node = this.createNode(item)
        this.length++
        if (!this.tail) {
            this.head = this.tail = node
            return
        }
        this.tail.next = node
        this.tail = node
    }
    remove(item: T): T | undefined {
        if (this.length === 0) return undefined
        let curr = this.head
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
                this.removeAt(i)
                return curr.value
            }
            curr = curr.next
        }
        return undefined
    }
    get(idx: number): T | undefined {
        return this.getNode(idx)?.value
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 || this.length < idx) return undefined
        this.length--
        if (this.length === 0) {
            const out = this.head?.value
            this.head = this.tail = undefined
            return out
        }
        if (idx === 0) {
            const out = this.head?.value
            this.head = this.head?.next
            return out
        }
        if (idx === this.length) {
            const out = this.tail?.value
            const prev = this.getNode(idx - 1)
            this.tail = prev
            return out
        }

        const curr = this.getNode(idx)
        if (!curr) return undefined
        const out = curr.value
        if (curr.next) {
            curr.value = curr.next.value
            if (curr.next === this.tail) this.tail = curr
            curr.next = curr.next.next
        }

        return out
    }

    private createNode(value: T): Node<T> {
        return { value }
    }
    private getNode(idx: number): Node<T> | undefined {
        let curr = this.head
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next
        }
        return curr
    }
}
