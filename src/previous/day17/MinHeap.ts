// 58
export default class MinHeap {
    public length: number
    public data: number[]

    constructor() {
        this.length = 0
        this.data = []
    }

    insert(value: number): void {
        this.data[this.length] = value
        this.heapifyUp(this.length)
        this.length++
    }
    delete(): number {
        const out = this.data[0]
        if (!out) return -1
        this.length--
        if (this.length === 0) {
            this.data = []
            return out
        }

        this.data[0] = this.data[this.length]
        this.heapifyDown(0)
        return out
    }

    private heapifyDown(idx: number): void {
        const leftIdx = this.leftChild(idx)
        const rightIdx = this.rightChild(idx)
        if (leftIdx >= this.length || idx >= this.length) return // if the left idx is bigger than the length this means that the left idx is out of range and the idx that passed in to the function will not have any child, hance end recurse
        // parent 3  left will be 7 and if the len is 7 that means there is no child for this parent
        const leftVal = this.data[leftIdx]
        const rightVal = this.data[rightIdx]
        const parentVal = this.data[idx]

        if (rightVal > leftVal && parentVal > leftVal) {
            this.data[leftIdx] = parentVal
            this.data[idx] = leftVal
            this.heapifyDown(leftIdx)
        } else if (leftVal > rightVal && parentVal > rightVal) {
            this.data[rightIdx] = parentVal
            this.data[idx] = rightVal
            this.heapifyDown(rightIdx)
        }
    }
    private heapifyUp(idx: number): void {
        if (idx === 0) return // you can't heapify up more if its at the top
        const parentIdx = this.parent(idx)
        const parentVal = this.data[parentIdx]
        const value = this.data[idx]

        if (parentVal > value) {
            this.data[parentIdx] = value
            this.data[idx] = parentVal
            this.heapifyUp(parentIdx)
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2)
    }
    private leftChild(idx: number): number {
        return 2 * idx + 1
    }
    private rightChild(idx: number): number {
        return 2 * idx + 2
    }
}
