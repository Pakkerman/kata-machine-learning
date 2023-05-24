type Node<T> = {
    value: T
    next?: Node<T>
}

function createNode<T>(item: T): Node<T> {
    return { value: item } as Node<T>
}

export default class Queue<T> {
    public length: number
    private head?: Node<T>
    private tail?: Node<T>

    constructor() {
        this.head = this.tail = undefined
        this.length = 0
    }

    enqueue(item: T): void {
        this.length++
        const node = createNode(item)
        if (!this.tail) {
            this.head = this.tail = node
            return
        }
        this.tail.next = node
        this.tail = this.tail.next
    }
    deque(): T | undefined {
        if (!this.head) return undefined
        this.length--

        const out = this.head.value

        // If there is no item after head, means after
        // this operation, the queue will be empty,
        // set head and tail to undefined
        if (!this.head.next) {
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

// type Node<T> = {
//     value: T
//     next?: Node<T>
// }

// export default class Queue<T> {
//     public length: number
//     private head?: Node<T>
//     private tail?: Node<T>

//     constructor() {
//         this.head = this.tail = undefined
//         this.length = 0
//     }

//     enqueue(item: T): void {
//         const node = { value: item } as Node<T>
//         this.length++
//         if (!this.tail) {
//             this.tail = this.head = node
//             return
//         }

//         this.tail.next = node
//         this.tail = node
//     }
//     deque(): T | undefined {
//         if (!this.head) {
//             return undefined
//         }

//         this.length--

//         const head = this.head
//         this.head = this.head.next

//         head.next = undefined
//         if (this.length === 0) {
//             this.tail = undefined
//         }

//         return head.value
//     }
//     peek(): T | undefined {
//         return this.head?.value
//     }
// }

// const list = new Queue<Number>()

// list.enqueue(1)
// console.log(list.length, list.peek())
// list.deque()
// console.log(list.length, list.peek())
// list.enqueue(69)
// console.log(list.length, list.peek())
