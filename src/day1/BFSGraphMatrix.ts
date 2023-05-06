export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false)
    const prev = new Array(graph.length).fill(-1)
    seen[source] = true
    const q: number[] = [source]

    do {
        const curr = q.shift() as number
        if (curr === needle) break

        const adjs = graph[curr]
        for (let i = 0; i < adjs.length; i++) {
            if (adjs[i] === 0) continue
            if (seen[i]) continue

            seen[i] = true // set seen to be true
            prev[i] = curr // set prev[i] to the parent, which is the one that just got popped off with shift()
            q.push(i)
        }
    } while (q.length)

    // after all nodes traversed, didn't find needle
    if (prev[needle] === -1) return null

    //  Build it backwards
    let curr = needle
    const out: number[] = []

    while (prev[curr] !== -1) {
        out.push(curr) // push in to out to build the path back out
        curr = prev[curr] // move current to its parent, ie, whoever added curr into the prev array
    }

    return [source].concat(out.reverse())
}
