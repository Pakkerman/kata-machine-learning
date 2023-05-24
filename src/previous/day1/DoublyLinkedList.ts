type Node<T> = {
    value: T
    next?: Node<T>
    prev?: Node<T>
}

function createNode<T>(value: T): Node<T> {
    return { value }
}

export default class DoublyLinkedList<T> {
    public length: number
    private head?: Node<T>
    private tail?: Node<T>

    constructor() {
        this.length = 0
        this.head = undefined
        this.tail = undefined
    }

    prepend(item: T): void {
        const node = createNode(item)
        this.length++
        if (!this.head) {
            this.head = this.tail = node
            return
        }

        node.next = this.head
        this.head.prev = node
        this.head = node
    }
    insertAt(item: T, idx: number): void {
        const node = createNode(item)
        this.length++
        if (this.length === 1) {
            this.head = this.tail = node
            return
        }
        let curr = this.getAt(idx)
        if (!curr) throw new Error("Inserting idx is out of range")

        node.next = curr
        node.prev = curr.prev

        curr.prev = node
        if (node.prev) {
            node.prev.next = node
        }
    }
    append(item: T): void {
        this.length++
        const node = createNode(item)
        if (!this.tail) {
            this.head = this.tail = node
            return
        }

        node.prev = this.tail
        this.tail.next = node
        this.tail = node
    }
    remove(item: T): T | undefined {
        let curr = this.head
        for (let i = 0; i < this.length && curr; i++) {
            if (curr.value === item) break
            curr = curr.next as Node<T>
        }
        if (!curr) return undefined

        return this.removeNode(curr)
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value
    }
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx)
        if (!node) return undefined

        return this.removeNode(node)
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--
        if (this.length === 0) {
            this.head = this.tail = undefined
            node.next = node.prev = undefined
            return node.value
        }

        if (node.prev) node.prev.next = node.next
        if (node.next) node.next.prev = node.prev
        if (node === this.head) this.head = this.head.next
        if (node === this.tail) this.tail = this.tail.prev

        node.next = undefined
        node.prev = undefined

        return node.value
    }
    private getAt(idx: number): Node<T> | undefined {
        if (this.length === 0) return undefined
        let curr = this.head
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next
        }
        return curr
    }
}
// type Node<T> = {
//     value: T
//     next?: Node<T>
//     prev?: Node<T>
// }

// export default class DoublyLinkedList<T> {
//     public length: number
//     private head?: Node<T>
//     private tail?: Node<T>

//     constructor() {
//         this.length = 0
//         this.head = undefined
//         this.tail = undefined
//     }

//     prepend(item: T): void {
//         const node = { value: item } as Node<T>
//         this.length++

//         if (!this.head) {
//             this.head = this.tail = node
//             return
//         }

//         node.next = this.head
//         this.head.prev = node
//         this.head = this.head.prev
//     }
//     insertAt(item: T, idx: number): void {
//         if (idx > this.length) {
//             throw new Error("Oh no")
//         }

//         if (idx === this.length) {
//             this.append(item)
//             return
//         } else if (idx === 0) {
//             this.prepend(item)
//             return
//         }

//         this.length++
//         const curr = this.getAt(idx) as Node<T>

//         const node = { value: item } as Node<T>
//         node.next = curr
//         node.prev = curr.prev
//         curr.prev = node

//         if (node.prev) {
//             node.prev.next = node
//         }
//     }

//     append(item: T): void {
//         this.length++
//         const node = { value: item } as Node<T>
//         if (!this.tail) {
//             this.head = this.tail = node
//             return
//         }

//         node.prev = this.tail
//         this.tail.next = node
//         this.tail = node
//     }
//     remove(item: T): T | undefined {
//         let curr = this.head
//         for (let i = 0; curr && i < this.length; i++) {
//             if (curr.value === item) break
//             curr = curr.next
//         }
//         if (!curr) {
//             return undefined
//         }

//         return this.removeNode(curr)
//     }
//     get(idx: number): T | undefined {
//         return this.getAt(idx)?.value
//     }
//     removeAt(idx: number): T | undefined {
//         const node = this.getAt(idx)

//         if (!node) return undefined

//         return this.removeNode(node)
//     }

//     private removeNode(node: Node<T>): T | undefined {
//         this.length--
//         if (this.length === 0) {
//             const out = this.head?.value
//             this.head = this.tail = undefined
//             return out
//         }
//         if (node.prev) {
//             node.prev.next = node.next
//         }
//         if (node.next) {
//             node.next.prev = node.prev
//         }

//         if (node === this.head) {
//             this.head = node.next
//         }
//         if (node === this.tail) {
//             this.tail = node.prev
//         }

//         node.next = node.prev = undefined
//         return node.value
//     }

//     private getAt(idx: number): Node<T> | undefined {
//         let curr = this.head

//         for (let i = 0; curr && i < idx; i++) {
//             curr = curr.next
//         }
//         return curr
//     }
// }