export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    // BASE
    // Structural Check: Structrally the same, both node is null
    if (a === null && b === null) return true
    // Structral Check: Only one of them is null, that means the structure is different, therefor return false
    if (a === null || b === null) return false
    // Value Check: If both node is not null and contains a value, compare the value to see if they're the same
    if (a.value !== b.value) return false
    // All checks out, recurse down further
    return compare(a.left, b.left) && compare(a.right, b.right)
}
