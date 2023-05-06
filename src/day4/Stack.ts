type Node<T> = {
    value: T
    prev?: Node<T>
}

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
        if (this.length === 1) {
            this.head = node
        }
        node.prev = this.tail
        this.tail = node
    }
    pop(): T | undefined {
        if (!this.head) return undefined
        this.length--
        const out = this.tail?.value
        if (this.tail === this.head) {
            this.tail = this.head = undefined
            return out
        }
        this.tail = this.tail?.prev
        return out
    }
    peek(): T | undefined {
        return this.head?.value
    }
}
