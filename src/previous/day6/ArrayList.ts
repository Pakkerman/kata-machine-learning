export default class ArrayList<T> {
    public length: number
    public capacity: number
    public data: (T | undefined)[]

    constructor(cap: number) {
        this.length = 0
        this.capacity = cap
        this.data = new Array(cap)
    }

    prepend(item: T): void {
        this.checkSize()
        this.length++
        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[0] = item
    }
    insertAt(item: T, idx: number): void {
        this.checkSize()
        if (idx < 0 || this.length < idx) throw new Error("idx is out of range")
        this.length++
        for (let i = this.length; i > idx; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[idx] = item
    }
    append(item: T): void {
        this.checkSize()
        this.data[this.length] = item
        this.length++
    }
    remove(item: T): T | undefined {
        let idx = -1
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === item) {
                idx = i
                break
            }
        }
        if (idx === -1) return undefined

        return this.removeAt(idx)
    }
    get(idx: number): T | undefined {
        return this.data[idx]
    }
    removeAt(idx: number): T | undefined {
        if (this.length === 0) return undefined
        const out = this.data[idx]
        if (!out) throw Error("idx out of range")
        for (let i = idx; i < this.length; i++) {
            this.data[i] = this.data[i + 1]
        }
        this.length--
        return out
    }

    private checkSize() {
        if (this.length < this.capacity) return
        const old = this.data
        this.capacity *= 2
        this.data = new Array(this.capacity)
        for (let i = 0; i < this.length; i++) {
            this.data[i] = old[i]
        }
    }
}
