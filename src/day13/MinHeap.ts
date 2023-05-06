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
        const LIdx = this.leftChild(idx)
        const RIdx = this.rightChild(idx)

        if (idx >= this.length || LIdx >= this.length) return

        const LVal = this.data[LIdx]
        const RVal = this.data[RIdx]
        const PVal = this.data[idx]

        if (RVal > LVal && PVal > LVal) {
            this.data[LIdx] = PVal
            this.data[idx] = LVal
            this.heapifyDown(LIdx)
        } else if (LVal > RVal && PVal > RVal) {
            this.data[RIdx] = PVal
            this.data[idx] = RVal
            this.heapifyDown(RIdx)
        }
    }
    private heapifyUp(idx: number): void {
        const pI = this.parent(idx)
        const pV = this.data[pI]
        const v = this.data[idx]

        if (pV > v) {
            this.data[pI] = v
            this.data[idx] = pV
            this.heapifyUp(pI)
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
