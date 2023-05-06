type Node<T> = {
    value: T
    prev?: Node<T>
}

// 3 << 2 << 1 << push << pop <<
// h         t

export default class Stack<T> {
    public length: number
    private head?: Node<T>
    private tail?: Node<T>

    constructor() {
        this.length = 0
        this.head = undefined
        this.tail = undefined
    }

    push(item: T): void {
        const node: Node<T> = { value: item }
        this.length++

        if (this.length === 0) {
            this.tail = this.head = node
            return
        }

        node.prev = this.tail
        this.tail = node
    }
    pop(): T | undefined {
        const out = this.tail?.value
        if (!out) return undefined
        this.length--

        if (this.head === this.tail) {
            this.tail = this.head = undefined
            return out
        }

        this.tail = this.tail?.prev

        return out
    }
    peek(): T | undefined {
        return this.tail?.value
    }
}
