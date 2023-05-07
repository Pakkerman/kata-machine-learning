export default class ArrayList<T> {
    public length: number
    public capacity: number
    public data: (T | undefined)[]

    constructor(capacity: number = 10) {
        this.length = 0
        this.capacity = capacity
        this.data = new Array(capacity)
    }
    // 1,2,3
    //  ,1,2,3
    // ^ insert
    prepend(item: T): void {
        for (let i = this.length; i >= 0; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.length++
        this.data[0] = item
    }
    insertAt(item: T, idx: number): void {
        for (let i = this.length; i >= idx; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.length++
        this.data[idx] = item
    }

    // 1,2,3, < append
    append(item: T): void {
        this.length++
        if (this.length > this.capacity) this.resize()
        this.data[this.length - 1] = item
    }
    remove(item: T): T | undefined {
        const idx = this.getIdx(item)
        if (idx === -1) return undefined

        return this.removeAt(idx)
    }
    get(idx: number): T | undefined {
        return this.data[idx]
    }

    // 5 >> 7 >> 9
    // 5 >>   >> 9
    removeAt(idx: number): T | undefined {
        const out = this.get(idx)
        if (!out) return out

        for (let i = idx; i < this.length; i++) {
            this.data[i] = this.data[i + 1]
        }
        this.length-- // just handle lenght after the for loop , easier that way
        return out
    }

    private resize() {
        const old = this.data
        this.data = new Array(this.capacity * 2)
        this.capacity *= 2
        for (let i = 0; i < this.length; i++) {
            this.data[i] = old[i]
        }
    }
    private getIdx(item: T): number {
        let idx = -1
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === item) {
                idx = i
                return idx
            }
        }
        return idx
    }
}
