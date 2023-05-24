export default class MinHeap {
    public length: number
    public data: number[]

    constructor() {
        this.length = 0
        this.data = []
    }

    insert(value: number): void {
        this.data[this.length] = value
        this.length++
        this.heapifyUp(this.length)
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
        const [left, leftVal] = this.left(idx)
        const [right, rightVal] = this.right(idx)
        if (left >= this.length || idx >= this.length) return

        const parentVal = this.data[idx]
        if (parentVal > leftVal && rightVal > leftVal) {
            this.data[idx] = leftVal
            this.data[left] = parentVal
            this.heapifyDown(left)
        } else if (parentVal > rightVal && leftVal > rightVal) {
            this.data[idx] = rightVal
            this.data[right] = parentVal
            this.heapifyDown(right)
        }
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) return

        const [parent, parentVal] = this.parent(idx)
        const childVal = this.data[idx]
        if (parentVal > childVal) {
            this.data[idx] = parentVal
            this.data[parent] = childVal
            this.heapifyUp(parent)
        }
    }
    private parent(idx: number): [idx: number, val: number] {
        const i = Math.floor((idx - 1) / 2)
        return [i, this.data[i]]
    }
    private left(idx: number): [idx: number, val: number] {
        const i = idx * 2 + 1
        return [i, this.data[i]]
    }
    private right(idx: number): [idx: number, val: number] {
        const i = idx * 2 + 2
        return [i, this.data[i]]
    }
}
