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
        this.head = undefined
        this.tail = undefined
    }

    // 1 << enqueue
    // 1 >> 2 >> 3 << enqueue
    enqueue(item: T): void {
        const node = { value: item } as Node<T>
        this.length++

        if (!this.tail) {
            this.head = this.tail = node
            return
        }

        this.tail.next = node
        this.tail = node
    }

    // 1 < deque
    // 1 >> 2 >> 3 < deque
    deque(): T | undefined {
        if (!this.head) {
            return undefined
        }
        const curr = this.head
        this.length--
        if (!this.head.next) {
            this.tail = undefined
        }

        this.head = this.head.next
        return curr.value
    }
    peek(): T | undefined {
        return this.head?.value
    }
}
