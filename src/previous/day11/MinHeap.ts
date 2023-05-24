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
        console.log(this.data)
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
        const lIdx = this.leftChild(idx)
        const rIdx = this.rightChild(idx)
        // take the last item put it to the first position
        if (idx < 0 || this.length <= idx || lIdx >= this.length) return

        const lV = this.data[lIdx]
        const rV = this.data[rIdx]
        const v = this.data[idx]

        if (lV > rV && v > rV) {
            this.data[idx] = rV
            this.data[rIdx] = v
            this.heapifyDown(rIdx)
        } else if (rV > lV && v > lV) {
            this.data[idx] = lV
            this.data[lIdx] = v
            this.heapifyDown(lIdx)
        }
    }
    private heapifyUp(idx: number): void {
        // compare with parent and swap if is smaller than parent
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
        return idx * 2 + 1
    }
    private rightChild(idx: number): number {
        return idx * 2 + 2
    }
}
