export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    // A array of values that can be BinaryNode<number> or null
    const queue: (BinaryNode<number> | null)[] = [head]

    while (queue.length) {
        // curr = the first item of the queue
        const curr = queue.shift()
        // continue if the null
        if (!curr) continue
        // Check the value
        if (curr.value === needle) return true

        // push curr's children to the queue
        queue.push(curr.left)
        queue.push(curr.right)
    }
    // If queue is empty and return false
    return false
}
