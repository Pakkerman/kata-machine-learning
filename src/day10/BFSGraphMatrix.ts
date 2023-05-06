export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    // a seen array that contains bool to check if the node is vistited
    const seen: boolean[] = new Array(graph.length).fill(false)
    // index is the node, value is boolean
    // a prev array that index is the node, and value is the parent node number
    const prev: number[] = new Array(graph.length).fill(-1)
    // set the beginning to seen
    seen[source] = true

    // use queue to BFS
    const queue: number[] = [source]

    // lord's loop
    while (queue.length) {
        const curr = queue.shift() as number
        if (curr === needle) break

        console.log(queue)

        const adjs = graph[curr]
        for (let i = 0; i < adjs.length; i++) {
            if (adjs[i] === 0) continue
            if (seen[i]) continue

            seen[i] = true
            prev[i] = curr
            queue.push(i)
        }
    }
    // get adjs row of the graph, index is the node
    // iterate through the adjs and find where it connected to
    // [0, 0, 3, 2,....] if it's 0, skip, and check
    // i in this loop represents the connection to other nodes
    // 0 means is NOT connected
    // other values means IS connected, and the number is the edge weight
    // update the seen and prev, seen is just set the i(node) to true
    // prev is update the i(node)'s value to the parent which is the current now
    // after this iteration curr will be the next node

    if (prev[needle] === -1) return null

    // if check in prev with needle, and the value is -1
    // that means needle was never found so it is still the value that was initialed
    // build path back out using prev array
    let curr = needle
    const out = []
    while (prev[curr] !== -1) {
        out.push(curr)
        curr = prev[curr]
    }
    out.push(source)
    return out.reverse()
    // concat and reverse the out
}
