// primeagen: You have an arraylist that has an arraylist to store the key and value
//

export default class Map<T extends string | number, V> {
    private length: number
    private capacity: number
    constructor() {
        this.length = 0
        this.capacity = 10
    }

    get(key: T): V | undefined {
        return undefined
    }
    set(key: T, value: V): void {
        // hash the key, use cap % key
        console.log(this.hash(key))
    }
    delete(key: T): V | undefined {
        return undefined
    }
    size(): number {
        return this.length
    }

    private hash(key: T): number {
        if (typeof key === "number") return key % this.capacity
        let charCodeSum = 0
        for (let i = 0; i < key.length; i++) {
            charCodeSum += key.charCodeAt(i)
        }
        return charCodeSum % this.capacity
    }
}
