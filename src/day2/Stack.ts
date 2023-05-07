// First in last out
// A << B << C << D
type Node<T> = {
    value: T
    prev?: Node<T>
}
function createNode<T>(value: T): Node<T> {
    return { value }
}
export default class Stack<T> {
    public length: number
    private head?: Node<T>
    private tail?: Node<T>

    constructor() {
        this.length = 0
        this.head = this.tail = undefined
    }

    push(item: T): void {
        this.length++
        const node = createNode(item)
        if (!this.tail) {
            this.head = this.tail = node
            return
        }

        node.prev = this.tail
        this.tail = node
    }
    pop(): T | undefined {
        if (!this.tail) return undefined
        this.length--

        const out = this.tail.value
        this.tail = this.tail.prev

        return out
    }
    peek(): T | undefined {
        return this.head?.value
    }
}
