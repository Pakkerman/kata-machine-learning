export default class ArrayList<T> {
    public length: number
    private cap: number
    private data: (T | undefined)[]

    constructor(cap: number = 10) {
        this.length = 0
        this.cap = cap
        this.data = new Array(cap)
    }

    prepend(item: T): void {
        this.length++
        this.checkSize()

        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[0] = item
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) return this.prepend(item)
        if (idx === this.length - 1) return this.append(item)
        this.length++
        this.checkSize()

        for (let i = this.length; i > idx; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[idx] = item
    }
    append(item: T): void {
        this.length++
        this.checkSize()
        this.data[this.length - 1] = item
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
        if (!this.data[idx]) return undefined
        this.length--
        const out = this.data[idx]
        for (let i = idx; i < this.length; i++) {
            this.data[i] = this.data[i + 1]
        }

        return out
    }

    private checkSize() {
        if (this.length < this.cap) return
        const old = this.data
        this.cap *= 2
        this.data = new Array(this.cap)
        for (let i = 0; i < this.length; i++) {
            this.data[i] = old[i]
        }
    }
}
