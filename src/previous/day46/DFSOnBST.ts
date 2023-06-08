export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  function search(curr: BinaryNode<number> | null): boolean {
    if (!curr) return false
    if (curr.value === needle) return true
    return needle < curr.value ? search(curr.left) : search(curr.right)
  }
  return search(head)
}
