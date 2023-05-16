// 50
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
        const [lIdx, lVal] = this.leftChild(idx)
        const [rIdx, rVal] = this.rightChild(idx)
        if (lIdx >= this.length || idx >= this.length) return

        const pVal = this.data[idx]
        if (rVal > lVal && pVal > lVal) {
            this.data[lIdx] = pVal
            this.data[idx] = lVal
            this.heapifyDown(lIdx)
        } else if (lVal > rVal && pVal > rVal) {
            this.data[rIdx] = pVal
            this.data[idx] = rVal
            this.heapifyDown(rIdx)
        }
    }
    private heapifyUp(idx: number): void {
        if (idx === 0) return
        const [pIdx, pVal] = this.parent(idx)
        const val = this.data[idx]
        if (pVal > val) {
            this.data[pIdx] = val
            this.data[idx] = pVal
            this.heapifyUp(pIdx)
        }
    }

    private parent(idx: number): [idx: number, val: number] {
        const i = Math.floor((idx - 1) / 2)
        return [i, this.data[i]]
    }
    private leftChild(idx: number): [idx: number, val: number] {
        const i = idx * 2 + 1
        return [i, this.data[i]]
    }
    private rightChild(idx: number): [idx: number, val: number] {
        const i = idx * 2 + 2
        return [i, this.data[i]]
    }
}
