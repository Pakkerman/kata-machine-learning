export default function dfs(
  curr: BinaryNode<number> | null,
  needle: number
): boolean {
  if (!curr) return false
  if (curr.value === needle) return true
  if (needle < curr.value) return dfs(curr.left, needle)
  return dfs(curr.right, needle)
}
