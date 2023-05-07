// A >> B >> C >> D
// First in last out
type Node<T> = {
    value: T
    next?: Node<T>
}
function createNode<T>(value: T): Node<T> {
    return { value }
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
        this.length++
        const node = createNode(item)
        if (!this.tail) {
            this.head = this.tail = node
            return
        }
        this.tail.next = node
        this.tail = node
    }
    deque(): T | undefined {
        if (!this.head) {
            return undefined
        }

        this.length--
        // if there is only one item in the list, after the head is popped out,
        // tail will still be pointing to the popped out node, set it to undefined
        // and leave the head to walk to the next and be undefined
        if (!this.head.next) {
            this.tail = undefined
        }
        const out = this.head.value
        this.head = this.head.next

        return out
    }
    peek(): T | undefined {
        return this.head?.value
    }
}
