// ArrayList, grow as needed
export default class ArrayList<T> {
    public length: number
    public capacity: number
    public data: (T | undefined)[]

    constructor(capacity: number) {
        this.length = 0
        this.capacity = capacity
        this.data = new Array(capacity)
    }

    prepend(item: T): void {
        this.length++
        this.checkGrow()
        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[0] = item
    }
    insertAt(item: T, idx: number): void {
        if (idx < 0 || this.length < idx) throw new Error("idx is out of range")
        if (idx === 0) return this.prepend(item)
        if (idx === this.length - 1) return this.append(item)
        this.length++
        for (let i = this.length; i > idx; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[idx] = item
    }
    append(item: T): void {
        this.length++
        this.checkGrow()
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
        const out = this.data[idx]
        if (!out) return undefined
        this.length--
        for (let i = idx; i < this.length; i++) {
            this.data[i] = this.data[i + 1]
        }
        return out
    }

    private checkGrow() {
        if (this.length < this.capacity) return
        const oldData = this.data
        this.capacity *= 2
        this.data = new Array(this.capacity)
        for (let i = 0; i < this.length; i++) {
            this.data[i] = oldData[i]
        }
    }
}
