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
        if (idx === 0) return this.prepend(item)
        if (idx === this.length - 1) return this.append(item)
        const curr = this.getNode(idx)
        if (!curr) throw new Error("idx out of range")
        const node = this.createNode(curr.value)
        this.length++

        curr.value = item
        node.next = curr.next
        curr.next = node
    }
    append(item: T): void {
        const node = this.createNode(item)
        this.length++
        if (!this.tail) {
            this.tail = this.head = node
            return
        }
        this.tail.next = node
        this.tail = node
    }
    remove(item: T): T | undefined {
        let idx = -1
        let curr = this.head
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
        const out = curr.value
        this.length--
        if (this.length === 0) {
            this.head = this.tail = undefined
            return out
        }
        if (curr === this.head) {
            this.head = this.head.next
            return out
        }
        if (curr === this.tail) {
            this.tail = this.getNode(idx - 1)
            return out
        }

        if (curr.next === this.tail) this.tail = curr
        if (curr.next) {
            curr.value = curr.next.value
            curr.next = curr.next.next
        }
        return out
    }

    private createNode<T>(value: T): Node<T> {
        return { value }
    }

    private getNode(idx: number): Node<T> | undefined {
        if (idx < 0 || this.length < idx) return undefined
        let curr = this.head
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next
        }
        return curr
    }
}
