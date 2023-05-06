export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const queue: (BinaryNode<number> | null)[] = [head]

    while (queue.length) {
        const curr = queue.shift()
        if (!curr) continue
        const value = curr.value
        if (value === needle) return true

        queue.push(curr.left)
        queue.push(curr.right)
    }
    return false
}
