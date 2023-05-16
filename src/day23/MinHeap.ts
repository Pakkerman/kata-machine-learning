export default class MinHeap {
    public length: number
    public data: number[]

    constructor() {
        this.length = 0
        this.data = []
    }

    insert(value: number): void {
        this.data[this.length] = value
        this.heapifyUp(this.length)
        this.length++
    }
    delete(): number {
        const out = this.data[0]
        if (!out) return -1
        this.length--
        if (this.length === 0) {
            this.data = []
            return out
        }

        this.data[0] = this.data[this.length]
        this.heapifyDown(0)
        return out
    }

    private heapifyDown(idx: number): void {
        const [left, leftValue] = this.left(idx)
        const [right, rightValue] = this.right(idx)
        if (left >= this.length || idx >= this.length) return

        const parentValue = this.data[idx]
        if (rightValue > leftValue && parentValue > leftValue) {
            this.data[left] = parentValue
            this.data[idx] = leftValue
            this.heapifyDown(left)
        } else if (leftValue > rightValue && parentValue > rightValue) {
            this.data[right] = parentValue
            this.data[idx] = rightValue
            this.heapifyDown(right)
        }
    }
    private heapifyUp(idx: number): void {
        if (idx === 0) return
        const [parent, parentValue] = this.parent(idx)
        const childValue = this.data[idx]
        if (parentValue > childValue) {
            this.data[idx] = parentValue
            this.data[parent] = childValue
            this.heapifyUp(parent)
        }
    }

    private parent(idx: number): [idx: number, value: number] {
        const i = Math.floor((idx - 1) / 2)
        return [i, this.data[i]]
    }
    private left(idx: number): [idx: number, value: number] {
        const i = idx * 2 + 1
        return [i, this.data[i]]
    }
    private right(idx: number): [idx: number, value: number] {
        const i = idx * 2 + 2
        return [i, this.data[i]]
    }
}
