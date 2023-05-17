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
        const [l, lV] = this.left(idx)
        const [r, rV] = this.right(idx)
        if (l >= this.length || idx >= this.length) return
        const pV = this.data[idx]
        if (rV > lV && pV > lV) {
            this.data[idx] = lV
            this.data[l] = pV
            this.heapifyDown(l)
        } else if (lV > rV && pV > rV) {
            this.data[idx] = rV
            this.data[r] = pV
            this.heapifyDown(r)
        }
    }
    private heapifyUp(idx: number): void {
        if (idx === 0) return
        const [p, pV] = this.parent(idx)
        const cV = this.data[idx]
        if (pV > cV) {
            this.data[idx] = pV
            this.data[p] = cV
            this.heapifyUp(p)
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
