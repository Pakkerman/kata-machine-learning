export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    const search = (curr: BinaryNode<number> | null): boolean => {
        if (!curr) return false
        if (curr.value === needle) return true
        if (needle < curr.value) return search(curr.left)
        return search(curr.right)
    }

    return search(head)
}
