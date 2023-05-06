export default class ArrayList<T> {
    public length: number
    private cap: number
    public data: T[]

    constructor(cap: number = 10) {
        this.length = 0
        this.cap = cap
        this.data = new Array(cap)
    }

    prepend(item: T): void {
        this.length++
        this.resize()

        for (let i = this.length; i > 0; i--) this.data[i] = this.data[i - 1]
        this.data[0] = item
    }
    insertAt(item: T, idx: number): void {
        if (idx < 0 || this.length <= idx) return
        if (idx === 0) return this.prepend(item)
        if (idx === this.length) return this.append(item)
        this.length++
        this.resize()

        for (let i = this.length; i > idx; i--) {
            this.data[i] = this.data[i - 1]
        }

        this.data[idx] = item
    }
    append(item: T): void {
        this.length++
        this.resize()
        this.data[this.length - 1] = item
    }
    remove(item: T): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === item) return this.removeAt(i)
        }
        return undefined
    }
    get(idx: number): T | undefined {
        return this.data[idx]
    }
    removeAt(idx: number): T | undefined {
        const out = this.data[idx]
        if (!out) return undefined
        this.length--

        for (let i = idx; i < this.length; i++) this.data[i] = this.data[i + 1]

        return out
    }
    private resize() {
        if (this.length < this.cap) return

        const old = this.data
        this.cap *= 2
        this.data = new Array(this.cap)
        for (let i = 0; i < this.length; i++) {
            this.data[i] = old[i]
        }
    }
}
