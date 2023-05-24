export default class ArrayList<T> {
    public length: number
    public data: T[]
    private cap: number

    constructor(cap: number = 10) {
        this.length = 0
        this.cap = cap
        this.data = new Array(cap)
    }

    prepend(item: T): void {
        this.length++
        this.resize()
        for (let i = this.length - 1; i > 0; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[0] = item
    }
    insertAt(item: T, idx: number): void {
        this.length++
        this.resize()
        for (let i = this.length - 1; i > idx; i--) {
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
        return this.data?.[idx]
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 || this.length < idx) return undefined
        this.length--
        const out = this.data[idx]
        for (let i = idx; i < this.length; i++) {
            this.data[i] = this.data[i + 1]
        }
        return out
    }

    private resize() {
        if (this.length < this.cap) return
        this.cap *= 2
        const newArr = new Array(this.cap)
        for (let i = 0; i < this.length; i++) {
            newArr[i] = this.data[i]
        }
        this.data = newArr
    }
}
