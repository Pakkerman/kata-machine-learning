export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q: (BinaryNode<number> | null)[] = [head]

    while (q.length) {
        const curr = q.shift() as BinaryNode<number> | undefined | null
        if (!curr) continue

        if (curr.value === needle) return true

        q.push(head.left)
        q.push(head.right)
    }

    return false
}
