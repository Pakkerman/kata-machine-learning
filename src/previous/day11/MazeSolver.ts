const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
]

function explore(
    maze: string[],
    wall: string,
    { x, y }: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // out of map
    if (x < 0 || maze[0].length <= x || y < 0 || maze.length <= y) return false
    // hit the wall
    if (maze[y][x] === wall) return false
    // walked this way
    if (seen[y][x]) return false
    // reached the end
    if (end.x === x && end.y === y) {
        path.push(end)
        return true
    }

    // recurese
    seen[y][x] = true
    path.push({ x, y })
    // pre
    // recursion
    for (let i = 0; i < dir.length; i++) {
        const [offsetX, offsetY] = dir[i]
        if (
            explore(
                maze,
                wall,
                { x: x + offsetX, y: y + offsetY },
                end,
                seen,
                path,
            )
        )
            return true
    }
    // post
    path.pop()

    return false
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = []
    const path: Point[] = []

    for (let i = 0; i < maze.length; i++)
        seen.push(new Array(maze[i].length).fill(false))

    explore(maze, wall, start, end, seen, path)
    return path
}
