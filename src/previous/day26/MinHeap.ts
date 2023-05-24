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

    private heapifyDown(p: number): void {
        const [l, lV] = this.left(p)
        const [r, rV] = this.right(p)
        if (p >= this.length || l >= this.length) return
        const pV = this.data[p]

        if (pV > lV && rV > lV) {
            this.data[p] = lV
            this.data[l] = pV
            this.heapifyDown(l)
        } else if (pV > rV && lV > rV) {
            this.data[p] = rV
            this.data[r] = pV
            this.heapifyDown(r)
        }
    }

    private heapifyUp(c: number): void {
        if (c === 0) return
        const [p, pV] = this.parent(c)
        const cV = this.data[c]
        if (pV > cV) {
            this.data[c] = pV
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
