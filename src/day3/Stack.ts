type Node<T> = {
    value: T
    prev?: Node<T>
}

export default class Stack<T> {
    public length: number
    public head?: Node<T>
    public tail?: Node<T>
    constructor() {
        this.length = 0
        this.head = this.tail = undefined
    }

    // 2 >> 3 >> 5 << push in
    push(item: T): void {
        const node = { value: item } as Node<T>
        this.length++
        if (!this.tail) {
            this.head = this.tail = node
            return
        }
        node.prev = this.tail
        this.tail = node
    }

    // 2 >> 3 >> 5 << pop the last
    // 2 << pop the last
    pop(): T | undefined {
        if (!this.tail) {
            return undefined
        }
        this.length--
        const curr = this.tail
        if (!this.tail.prev) {
            this.head = this.tail = undefined
            return curr.value
        }

        this.tail = this.tail.prev
        return curr.value
    }
    peek(): T | undefined {
        return this.head?.value
    }
}
