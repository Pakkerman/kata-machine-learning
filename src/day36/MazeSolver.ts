const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
]

function explore(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    const { x, y } = curr
    if (x < 0 || maze[0].length <= x || y < 0 || maze.length <= y) return false
    if (maze[y][x] === wall) return false
    if (seen[y][x]) return false

    seen[y][x] = true
    path.push(curr)
    if (end.x === x && end.y === y) return true

    for (let i = 0; i < dir.length; i++) {
        const [xoff, yoff] = dir[i]
        if (explore(maze, wall, { x: x + xoff, y: y + yoff }, end, seen, path))
            return true
    }

    path.pop()
    return false
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const path: Point[] = []
    const seen: boolean[][] = []
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[i].length).fill(false))
    }

    explore(maze, wall, start, end, seen, path)
    return path
}
