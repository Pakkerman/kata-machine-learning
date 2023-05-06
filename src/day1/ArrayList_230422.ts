export default class ArrayList<T> {
    public length: number
    private capacity: number
    private array: T[]

    constructor(capacity: number = 10) {
        this.length = 0
        this.capacity = capacity
        this.array = new Array<T>(this.capacity)
    }

    prepend(item: T): void {
        this.length++
        if (this.length > this.capacity) this.resize()

        if (this.length === 1) {
            this.array[0] = item
            return
        }
        for (let i = this.length; i >= 0; i--) {
            // item is the first item
            // shift the stuff to the right and make room for the pending item first
            // wait, how to do that?
            // i is the current item, i + 1 is the next item
            // reverse the for loop? yeah
            this.array[i + 1] = this.array[i]
        }
        this.array[0] = item
    }
    insertAt(item: T, idx: number): void {
        // If the index is out of range, return
        // If the index is at zero, prepend
        // If the index is at the end, append
        // increase length, resize if needed
        // if the index is in the middle, insert and move the items after index by one

        if (idx < 0 || idx >= this.length) throw new Error("Index out of range")
        if (idx === 0) this.prepend(item)
        if (idx === this.length - 1) this.append(item)

        this.length++
        if (this.length > this.capacity) this.resize()

        for (let i = this.length; i > idx; i--) {
            this.array[i] = this.array[i - 1]
        }

        // 3 >> 2 >> 1 insert 2 at 1
        // i = 3 >> 3 >> 2 >> null >> 1
        // i = 2 >> 3 >> null >> 2 >> 1
        this.array[idx] = item
    }

    append(item: T): void {
        this.length++
        if (this.length > this.capacity) this.resize()

        this.array[this.length - 1] = item
    }
    remove(item: T): T | undefined {
        let found = false
        let out = undefined
        for (let i = 0; i < this.length; i++) {
            if (this.array[i] === item) {
                found = true
                out = this.array[i]
            }

            if (found) {
                this.array[i] = this.array[i + 1]
            }
        }

        if (!found) return undefined
        this.length--

        return out
    }
    get(idx: number): T | undefined {
        return this.array[idx]
    }
    removeAt(idx: number): T | undefined {
        const item = this.get(idx)
        if (!item) return undefined

        for (let i = idx; i < this.length; i++) {
            this.array[i] = this.array[i + 1]
        }

        this.length--

        return item
    }

    private resize() {
        const old = this.array
        this.array = new Array(this.capacity * 2).fill(null)
        this.capacity *= 2

        for (let i = 0; i < this.length; i++) {
            this.array[i] = old[i]
        }
    }
}
