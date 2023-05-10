// 48
export default class ArrayList<T> {
    public length: number
    public data: T[]
    private capacity: number

    constructor(capacity: number = 1) {
        this.length = 0
        this.capacity = capacity
        this.data = new Array(this.capacity)
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
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === item) {
                return this.removeAt(i)
            }
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
        for (let i = idx; i < this.length; i++) {
            this.data[i] = this.data[i + 1]
        }

        return out
    }

    private checkSize(): void {
        if (this.length <= this.capacity) return
        console.log(this.length, this.capacity)
        // const old = this.data
        this.capacity *= 2
        this.data.length = this.capacity
        // this.data = new Array(this.capacity).fill(this.data, 0, this.length - 1)
        // for (let i = 0; i < this.length; i++) {
        //     this.data[i] = old[i]
        // }
    }
}
