// 53
function traverse(curr: BinaryNode<number> | null, needle: number): boolean {
    if (!curr) return false

    if (curr.value === needle) return true

    if (needle < curr.value) return traverse(curr.left, needle)
    return traverse(curr.right, needle)
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return traverse(head, needle)
}
