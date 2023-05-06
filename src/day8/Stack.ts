type Node<T> = {
    value: T
    prev?: Node<T>
}
export default class Stack<T> {
    public length: number
    private head: Node<T> | undefined
    private tail: Node<T> | undefined

    constructor() {
        this.length = 0
        this.head = this.tail = undefined
    }

    push(item: T): void {
        const node: Node<T> = { value: item }
        this.length++
        if (!this.tail) {
            this.tail = this.head = node
            return
        }
        node.prev = this.tail
        this.tail = node
    }
    pop(): T | undefined {
        if (!this.tail) return undefined
        const out = this.tail.value
        this.length--
        if (this.length === 0) {
            this.tail = this.head = undefined
            return out
        }

        this.tail = this.tail.prev
        return out
    }
    peek(): T | undefined {
        return this.tail?.value
    }
}
