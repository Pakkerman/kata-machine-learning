export default class ArrayList<T> {
    public length: number
    private capacity: number
    private data: T[]

    constructor(cap: number = 10) {
        this.length = 0
        this.capacity = cap
        this.data = new Array(cap)
    }

    prepend(item: T): void {
        this.length++
        this.grow()

        for (let i = this.length - 1; i > 0; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[0] = item
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) return this.prepend(item)
        if (idx === this.length - 1) return this.append(item)

        this.length++
        this.grow()

        for (let i = this.length - 1; i > idx; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[idx] = item
    }
    append(item: T): void {
        this.data[this.length] = item
        this.length++
        this.grow()
    }
    remove(item: T): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === item) return this.removeAt(i)
        }
        return undefined
    }
    get(idx: number): T | undefined {
        if (idx < 0 || this.length <= idx) return undefined
        return this.data[idx]
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 || this.length <= idx) return undefined
        const out = this.data[idx]
        if (!out) return undefined
        this.length--

        for (let i = idx; i < this.length; i++) {
            this.data[i] = this.data[i + 1]
        }

        return out
    }

    private grow(): void {
        if (this.length < this.capacity) return
        const data = this.data
        this.capacity *= 2
        this.data = new Array(this.capacity)
        for (let i = 0; i < this.length; i++) {
            this.data[i] = data[i]
        }
    }
}
