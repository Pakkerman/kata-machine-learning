// ArrayList, grow as needed,
// with O(1) of get(), append(),
// O(N) of prepend(), insertAt(), removeAt(), remove()

export default class ArrayList<T> {
    public length: number
    public capacity: number
    data: T[]

    constructor(capacity: number = 10) {
        this.length = 0
        this.capacity = capacity
        this.data = new Array<T>(this.capacity)
    }

    prepend(item: T): void {
        this.length++
        if (this.length > this.capacity) this.resize()
        for (let i = this.length - 1; i > 0; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[0] = item
    }
    insertAt(item: T, idx: number): void {
        if (0 > idx || idx >= this.length)
            throw new Error("out of data range, can not insert at the index")
        if (idx === 0) this.prepend(item)
        if (idx === this.length - 1) this.append(item)

        this.length++
        if (this.length > this.capacity) this.resize()
        for (let i = this.length - 1; i > idx; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[idx] = item
    }
    append(item: T): void {
        this.length++
        if (this.length > this.capacity) this.resize()
        this.data[this.length - 1] = item
    }
    remove(item: T): T | undefined {
        let found = false
        let out
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === item) {
                found = true
                out = this.data[i]
            }
            if (found) {
                this.data[i] = this.data[i + 1]
            }
        }
        if (!found) return undefined
        this.length--
        return out
    }
    get(idx: number): T | undefined {
        return this.data[idx]
    }
    removeAt(idx: number): T | undefined {
        const out = this.get(idx)
        if (!out) return undefined

        for (let i = idx; i < this.length; i++) {
            this.data[i] = this.data[i + 1]
        }

        this.length--

        return out
    }

    printData() {
        console.log("PrintData", this.data, "length:", this.length)
    }

    private resize() {
        const old = this.data
        this.data = new Array(this.capacity * 2)

        for (let i = 0; i < this.length; i++) {
            this.data[i] = old[i]
        }
    }
}
