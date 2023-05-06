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
        this.head = this.tail = undefined
    }

    prepend(item: T): void {
        const node: Node<T> = createNode(item)
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
        if (!curr) throw new Error("Index is out of range")
        const node: Node<T> = createNode(curr.value)
        this.length++

        curr.value = item
        node.next = curr.next
        curr.next = node
    }
    append(item: T): void {
        const node: Node<T> = createNode(item)
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
        if (!this.head) return undefined
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
        if (this.length === 0) {
            const out = this.head?.value
            this.head = this.tail = undefined
            return out
        }
        this.length--
        if (idx === 0) {
            const out = this.head?.value
            this.head = this.head?.next
            return out
        }
        const prev = this.getNode(idx - 1)
        if (!prev) return undefined
        const curr = prev.next
        const out = curr?.value

        if (curr === this.tail) {
            prev.next = undefined
            this.tail = prev
            return out
        }

        prev.next = curr?.next
        return out
    }

    private getNode(idx: number): Node<T> | undefined {
        let curr: Node<T> | undefined = this.head
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next
        }
        return curr
    }
}
