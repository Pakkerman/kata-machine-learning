type Node<T> = {
    value: T
    next?: Node<T>
}

export default class SinglyLinkedList<T> {
    public length: number
    public head?: Node<T>
    public tail?: Node<T>

    constructor() {
        this.length = 0
        this.head = undefined
        this.tail = undefined
    }

    prepend(item: T): void {
        const node = this.createNode(item)
        this.length++
        if (!this.head) {
            this.head = this.tail = node
            return
        }
        node.next = this.head
        this.head = node
    }

    // 3 >> 4 >> 5
    //   9 < insert
    insertAt(item: T, idx: number): void {
        let curr = this.getNode(idx)

        if (!curr) throw new Error("index out of range")

        this.length++
        // swap the value of curr and new node
        // connect the new node.next to curr.next, curr.next to node

        const node = this.createNode(curr.value)
        curr.value = item
        node.next = curr.next
        curr.next = node
    }
    append(item: T): void {
        const node = this.createNode(item)
        this.length++
        if (!this.tail) {
            this.head = this.tail = node
            return
        }
        this.tail.next = node
        this.tail = node
    }

    // 3 >> 4 >> 5 >> 4
    // h >> p >> c >> t
    remove(item: T): T | undefined {
        let curr = this.head
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
    // 3 >> 4 >> 5
    // 3 >> 5 >> 5
    // 3 >> 5 >> null
    removeAt(idx: number): T | undefined {
        if (!this.head) {
            throw new Error("index is out of range")
        }
        this.length--
        if (this.length === 0) {
            const out = this.head.value
            this.head = this.tail = undefined
            return out
        }

        if (idx === 0) {
            const out = this.head.value
            this.head = this.head.next
            return out
        }

        let prev = this.head
        for (let i = 0; prev && i < idx - 1; i++) {
            prev = prev.next as Node<T>
        }

        let curr = prev.next as Node<T>
        let out = curr.value

        if (curr === this.tail) {
            this.tail = prev
            prev.next = undefined
            return out
        }
        prev.next = curr.next
        return out
    }

    // 3 >> 4 >> 5 >> 6
    //           ^ remove

    private getNode(idx: number): Node<T> | undefined {
        let curr = this.head
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next
        }
        return curr
    }
    private createNode(value: T): Node<T> {
        return { value }
    }
}
