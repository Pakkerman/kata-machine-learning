export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return search(head)

  function search(curr: BinaryNode<number> | null): boolean {
    if (!curr) return false
    if (curr.value === needle) return true
    return search(curr.left) || search(curr.right)
  }
}
