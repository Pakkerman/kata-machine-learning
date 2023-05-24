function walk(node: BinaryNode<number> | null, path: number[]): number[] {
    if (node == null) return path

    // recurse
    walk(node.left, path)
    path.push(node.value)
    walk(node.right, path)
    return path
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, [])
}
