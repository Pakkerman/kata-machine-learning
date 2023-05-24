export default class ArrayList<T> {
    public length: number
    public data: (T | undefined)[]
    private capacity: number

    constructor(cap: number = 3) {
        this.length = 0
        this.capacity = cap
        this.data = new Array(cap)
    }

    // 3 >> 4 >> 5
    prepend(item: T): void {
        this.length++
        this.checkSize()
        for (let i = this.length - 1; i > 0; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[0] = item
    }
    insertAt(item: T, idx: number): void {
        if (idx < 0 || this.length < idx) throw new Error("index out of range")
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
    // 3 4 5 6
    removeAt(idx: number): T | undefined {
        if (idx < 0 || this.length < idx) throw new Error("index out of range")
        this.length--
        const out = this.data[idx]
        for (let i = idx; i < this.length; i++) {
            this.data[i] = this.data[i + 1]
        }
        return out
    }

    private checkSize(): void {
        if (this.length < this.capacity) return
        const old = this.data
        this.capacity *= 2
        this.data = new Array(this.capacity)

        for (let i = 0; i < this.length; i++) {
            this.data[i] = old[i]
        }
    }
}
