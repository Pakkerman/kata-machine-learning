// 37

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
        const [leftIdx, leftValue] = this.leftChild(idx)
        const [rightIdx, rightValue] = this.rightChild(idx)
        if (idx >= this.length || leftIdx >= this.length) return

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
        const [parentIdx, parentValue] = this.parent(idx)
        const childValue = this.data[idx]

        if (parentValue > childValue) {
            this.data[idx] = parentValue
            this.data[parentIdx] = childValue
            this.heapifyUp(parentIdx)
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
