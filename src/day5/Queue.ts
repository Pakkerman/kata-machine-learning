type Node<T> = {
    value: T
    next?: Node<T>
}
//     deque >  1 >> 3 >> 4 >> 5 < enqueue
//              h              t

export default class Queue<T> {
    public length: number
    private head?: Node<T>
    private tail?: Node<T>

    constructor() {
        this.length = 0
        this.head = undefined
        this.tail = undefined
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
        if (!this.head) return undefined
        this.length--

        const out = this.head.value
        if (this.head === this.tail) {
            this.head = this.tail = undefined
            return out
        }

        this.head = this.head.next
        return out
    }
    peek(): T | undefined {
        return this.head?.value
    }
}
