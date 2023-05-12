// 17

export default class MinHeap {
    public length: number
    public capacity: number
    public data: number[]

    constructor(capacity: number = 10) {
        this.length = 0
        this.capacity = capacity
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

    private heapifyUp(idx: number): void {
        if (idx === 0) return
        const [parentIdx, parentValue] = this.parent(idx)
        const value = this.data[idx]
        if (parentValue > value) {
            this.data[parentIdx] = value
            this.data[idx] = parentValue
            this.heapifyUp(parentIdx)
        }
    }
    private heapifyDown(idx: number): void {
        const [leftIdx, leftValue] = this.leftChild(idx)
        const [rightIdx, rightValue] = this.rightChild(idx)
        if (leftIdx >= this.length || idx >= this.length) {
            return
        }
        const parentValue = this.data[idx]

        if (parentValue > leftValue && rightValue > leftValue) {
            this.data[idx] = leftValue
            this.data[leftIdx] = parentValue
            this.heapifyDown(leftIdx)
        } else if (parentValue > rightValue && leftValue > rightValue) {
            this.data[idx] = rightValue
            this.data[rightIdx] = parentValue
            this.heapifyDown(rightIdx)
        }
    }

    private parent(idx: number): [idx: number, value: number] {
        const i = Math.floor((idx - 1) / 2)
        return [i, this.data[i]]
    }
    private leftChild(idx: number): [idx: number, value: number] {
        const i = idx * 2 + 1
        return [i, this.data[i]]
    }
    private rightChild(idx: number): [idx: number, value: number] {
        const i = idx * 2 + 2
        return [i, this.data[i]]
    }
}
