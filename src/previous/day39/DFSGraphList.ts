export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false)
    const path: number[] = []

    const traverse = (curr: number): boolean => {
        if (seen[curr]) return false

        path.push(curr)
        seen[curr] = true
        if (curr === needle) return true

        const list = graph[curr]
        for (let i = 0; i < list.length; i++) {
            const edge = list[i].to
            if (traverse(edge)) return true
        }

        path.pop()
        return false
    }

    traverse(source)

    return path.length === 0 ? null : path
}
