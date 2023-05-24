function search(node: BinaryNode<number> | null, needle: number): boolean {
    if (!node) return false
    if (node.value === needle) return true

    if (needle < node.value) return search(node.left, needle)
    if (needle > node.value) return search(node.right, needle)

    return false
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle)
}
