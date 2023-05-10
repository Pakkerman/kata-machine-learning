// 14

function hasUnvisted(seen: boolean[], dists: number[]): boolean {
    return seen.some((seen, idx) => !seen && dists[idx] < Infinity)
}

function getLowestUnvisted(seen: boolean[], dists: number[]): number {
    let idx = -1
    let lowestDistance = Infinity
    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) continue
        if (lowestDistance > dists[i]) {
            lowestDistance = dists[i]
            idx = i
        }
    }
    return idx
}

export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
    const seen: boolean[] = new Array(arr.length).fill(false)
    const prev: number[] = new Array(arr.length).fill(-1)
    const dists: number[] = new Array(arr.length).fill(Infinity)
    const queue: number[] = [source]

    dists[source] = 0

    while (hasUnvisted(seen, dists)) {
        const curr = getLowestUnvisted(seen, dists)

        seen[curr] = true
        const adjs = arr[curr]
        for (let i = 0; i < adjs.length; i++) {
            const { to: edge, weight } = adjs[i]
            if (seen[edge]) continue
            const dist = dists[curr] + weight
            if (dist < dists[edge]) {
                dists[edge] = dist
                prev[edge] = curr
            }
        }
    }
    const out: number[] = []
    let curr = sink
    while (prev[curr] !== -1) {
        out.push(curr)
        curr = prev[curr]
    }

    console.log(seen, prev, dists)

    out.push(source)
    return out.reverse()
}
