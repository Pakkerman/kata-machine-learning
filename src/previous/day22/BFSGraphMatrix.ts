// 8

export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false)
    const prev: number[] = new Array(graph.length).fill(-1)
    const queue: number[] = [source]

    seen[source] = true

    while (queue.length) {
        const curr = queue.shift() as number
        if (curr === needle) break

        const adjs = graph[curr]
        for (let i = 0; i < adjs.length; i++) {
            if (adjs[i] === 0 || seen[i]) continue
            prev[i] = curr
            seen[i] = true
            queue.push(i)
        }
    }
    const out: number[] = []
    let curr = needle
    if (prev[curr] === -1) return null

    while (prev[curr] !== -1) {
        out.push(curr)
        curr = prev[curr]
    }

    out.push(source)
    return out.reverse()
}
