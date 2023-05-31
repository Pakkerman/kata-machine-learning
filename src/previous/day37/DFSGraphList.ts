export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false)
    const path: number[] = []

    function explore(curr: number): boolean {
        if (seen[curr]) return false

        path.push(curr)
        seen[curr] = true
        if (curr === needle) return true

        const list = graph[curr]
        for (let i = 0; i < list.length; i++) {
            const edge = list[i].to
            if (explore(edge)) return true
        }

        path.pop()
        return false
    }

    explore(source)

    return path.length === 0 ? null : path
}
