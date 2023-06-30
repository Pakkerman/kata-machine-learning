export default function dfs(
  head: BinaryNode<number> | null,
  needle: number
): boolean {
  if (!head) return false

  if (head.value === needle) return true
  if (needle < head.value) return dfs(head.left, needle)
  return dfs(head.right, needle)
}
