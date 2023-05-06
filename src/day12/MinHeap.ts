export default class MinHeap {
    public length: number
    private data: number[]

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
        //
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
        const lI = this.leftChild(idx)
        const rI = this.rightChild(idx)

        if (idx >= this.length || lI >= this.length) return

        const pV = this.data[idx]
        const lV = this.data[lI]
        const rV = this.data[rI]

        if (lV > rV && pV > rV) {
            this.data[idx] = rV
            this.data[rI] = pV
            this.heapifyDown(rI)
        } else if (rV > lV && pV > lV) {
            this.data[idx] = lV
            this.data[lI] = pV
            this.heapifyDown(lI)
        }
    }
    private heapifyUp(idx: number): void {
        const parentIdx = this.parent(idx)
        const parentValue = this.data[parentIdx]
        const childValue = this.data[idx]

        if (childValue < parentValue) {
            this.data[parentIdx] = childValue
            this.data[idx] = parentValue
            this.heapifyUp(parentIdx)
        }
    }
    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2)
    }
    private leftChild(idx: number): number {
        return idx * 2 + 1
    }
    private rightChild(idx: number): number {
        return idx * 2 + 2
    }
}
