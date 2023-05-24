type Node<T> = {
    value: T
    prev?: Node<T>
}

export default class Stack<T> {
    public length: number
    private head?: Node<T>

    constructor() {
        this.length = 0
        this.head = undefined
    }

    push(item: T): void {
        this.length++
        const node = { value: item } as Node<T>

        const prev = this.head
        this.head = node
        this.head.prev = prev
    }
    pop(): T | undefined {
        if (!this.head) return undefined
        this.length--

        const out = this.head.value
        if (!this.head.prev) {
            this.head = undefined
            return out
        }
        this.head = this.head.prev

        return out
    }
    peek(): T | undefined {
        return this.head?.value
    }
}
// type Node<T> = {
//     value: T
//     prev?: Node<T>
// }

// export default class Stack<T> {
//     public length: number
//     private head?: Node<T>
//     private prev?: Node<T>

//     constructor() {
//         this.length = 0
//         this.prev = undefined
//     }

//     push(item: T): void {
//         const node = { value: item } as Node<T>
//         this.length++
//         if (!this.head) {
//             this.head = node
//         }

//         node.prev = this.head
//         this.head = node
//     }
//     pop(): T | undefined {
//         this.length = Math.max(0, this.length - 1) // Not really clear why here we are using length instead of using if(!this.head) to check if head is undefined
//         if (this.length === 0) {
//             const head = this.head // set a variable to the head
//             this.head = undefined // clear out node
//             return head?.value // return head point if theres a value to return, otherwise return undefined
//         }

//         const head = this.head
//         this.head = this.head?.prev
//         return head?.value
//     }
//     peek(): T | undefined {
//         return this.head?.value
//     }
// }
