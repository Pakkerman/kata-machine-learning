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
        const lI = this.lChild(idx)
        const rI = this.rChild(idx)

        if (idx >= this.length || lI >= this.length) return

        const lV = this.data[lI]
        const rV = this.data[rI]
        const v = this.data[idx]

        if (rV > lV && v > lV) {
            this.data[idx] = lV
            this.data[lI] = v
            this.heapifyDown(lI)
        } else if (lV > rV && v > rV) {
            this.data[idx] = rV
            this.data[rI] = v
            this.heapifyDown(rI)
        }
    }
    private heapifyUp(idx: number): void {
        if (idx === 0) return
        const pI = this.parent(idx)
        const pV = this.data[pI]
        const v = this.data[idx]

        if (pV > v) {
            this.swap(idx, pI)
            this.heapifyUp(pI)
        }
    }
    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2)
    }
    private lChild(idx: number): number {
        return 2 * idx + 1
    }
    private rChild(idx: number): number {
        return 2 * idx + 2
    }

    private swap(a: number, b: number): void {
        const tmp = this.data[a]
        this.data[a] = this.data[b]
        this.data[b] = tmp
    }
}
