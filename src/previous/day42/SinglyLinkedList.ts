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
            if (curr.value === item) {
                const out = curr.value
                this.removeNode(curr, i)
                return out
            }
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

        this.removeNode(curr, idx)
        return out
    }

    private getNode(idx: number): Node<T> | undefined {
        if (idx < 0 || this.length <= idx) return undefined
        let curr = this.head
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next
        }
        return curr
    }

    private removeNode(node: Node<T>, idx: number): void {
        if (node === this.head) this.head = this.head.next
        if (node === this.tail) this.tail = this.getNode(idx - 1)
        if (node.next === this.tail) this.tail = node
        if (node.next) {
            const tmp = node.next
            node.value = node.next.value
            node.next = node.next.next
            tmp.next = undefined
        }
        this.length--
    }
}
