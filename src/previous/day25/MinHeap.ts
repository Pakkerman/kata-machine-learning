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
        const [l, lVal] = this.left(p)
        const [r, rVal] = this.right(p)
        if (p >= this.length || l >= this.length) return
        const pVal = this.data[p]

        if (pVal > lVal && rVal > lVal) {
            this.data[l] = pVal
            this.data[p] = lVal
            this.heapifyDown(l)
        } else if (pVal > rVal && lVal > rVal) {
            this.data[r] = pVal
            this.data[p] = rVal
            this.heapifyDown(r)
        }
    }
    private heapifyUp(c: number): void {
        if (c === 0) return
        const [p, pVal] = this.parent(c)
        const cVal = this.data[c]

        if (pVal > cVal) {
            this.data[c] = pVal
            this.data[p] = cVal
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
