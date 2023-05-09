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
        if (this.length === 0) return -1
        const out = this.data[0]
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
        const leftIdx = this.leftChild(idx)
        const rightIdx = this.rightChild(idx)
        if (idx >= this.length || leftIdx >= this.length) return

        const leftValue = this.data[leftIdx]
        const rightValue = this.data[rightIdx]
        const parentValue = this.data[idx]

        if (rightValue > leftValue && parentValue > leftValue) {
            this.data[idx] = leftValue
            this.data[leftIdx] = parentValue
            this.heapifyDown(leftIdx)
        } else if (leftValue > rightValue && parentValue > rightValue) {
            this.data[idx] = rightValue
            this.data[rightIdx] = parentValue
            this.heapifyDown(rightIdx)
        }
    }
    private heapifyUp(idx: number): void {
        if (idx === 0) return
        const parentIdx = this.parent(idx)
        const parentValue = this.data[parentIdx]
        const value = this.data[idx]

        if (parentValue > value) {
            this.data[idx] = parentValue
            this.data[parentIdx] = value
            this.heapifyUp(parentIdx)
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2)
    }
    private leftChild(idx: number): number {
        return 2 * idx + 1
    }
    private rightChild(idx: number): number {
        return 2 * idx + 2
    }
}
