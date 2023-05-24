export default class ArrayList<T> {
    public length: number
    public capacity: number
    public data: T[]

    constructor(capacity: number = 10) {
        this.length = 0
        this.capacity = capacity
        this.data = new Array(capacity)
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
        if (idx > this.length - 1 || 0 > idx) throw new Error("Out of range")
        if (idx === 0) this.prepend(item)
        if (idx === this.length - 1) this.append(item)

        this.length++
        if (this.length > this.capacity) this.resize()

        for (let i = this.length - 1; i > idx; i--) {
            this.data[i] = this.data[i - 1]
        }

        this.data[idx] = item

        // 3 >> 4 >> 5
        // insert at 1
        // 3 >> 69 >> 4 >> 5
        // 3 >> 4 >> 5
        //           i
    }
    append(item: T): void {
        this.length++
        if (this.length > this.capacity) this.resize()
        this.data[this.length - 1] = item
    }
    remove(item: T): T | undefined {
        let idx = -1
        for (let i = idx; i < this.length; i++) {
            if (this.data[i] === item) idx = i
        }
        if (idx === -1) return undefined

        this.length--
        const out = this.get(idx)

        for (let i = idx; i <= this.length; i++) {
            this.data[i] = this.data[i + 1]
        }

        return out
    }
    get(idx: number): T | undefined {
        return this?.data[idx]
    }
    removeAt(idx: number): T | undefined {
        if (idx > this.length - 1 || 0 > idx) return undefined
        this.length--
        const out = this.get(idx)

        for (let i = idx; i <= this.length; i++) {
            this.data[i] = this.data[i + 1]
        }

        return out

        //3 >> 4 >> 5 >> 6
        // removeAt 1
        // 3 >> 5 >> 6 >> null
        // 3 >> 4 >> 5 >> 6
        //      i   i+1
        //     idx           len
    }
    private resize() {
        const old = this.data
        this.data = new Array(this.capacity * 2)
        this.capacity *= 2
        for (let i = 0; i < this.length; i++) {
            this.data[i] = old[i]
        }
    }
}
