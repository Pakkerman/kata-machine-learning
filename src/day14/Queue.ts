// 39
type Node<T> = {
    value: T
    next?: Node<T>
}

export default class Queue<T> {
    public length: number
    private head?: Node<T>
    private tail?: Node<T>

    constructor() {
        this.length = 0
        this.head = this.tail = undefined
    }

    enqueue(item: T): void {
        const node: Node<T> = { value: item }
        this.length++

        if (!this.tail) {
            this.head = this.tail = node
            return
        }

        this.tail.next = node
        this.tail = node
    }
    deque(): T | undefined {
        const out = this.peek()
        if (!out) return undefined
        this.length--
        if (this.length === 0) {
            this.head = this.tail = undefined
            return out
        }

        this.head = this.head?.next
        return out
    }
    peek(): T | undefined {
        return this.head?.value
    }
}
