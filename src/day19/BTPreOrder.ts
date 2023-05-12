// 26
function traverse(curr: BinaryNode<number> | null, path: number[]): number[] {
    if (!curr) return path
    path.push(curr.value)
    traverse(curr.left, path)
    traverse(curr.right, path)
    return path
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    return traverse(head, [])
}
