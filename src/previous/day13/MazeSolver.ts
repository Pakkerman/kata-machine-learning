// 04
const dir = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
]
function walk(
    maze: string[],
    wall: string,
    { x, y }: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    if (y < 0 || maze.length <= y || x < 0 || maze[0].length <= x) return false
    if (maze[y][x] === wall) return false
    if (seen[y][x]) return false

    // pre
    seen[y][x] = true
    path.push({ x, y })

    if (end.y === y && end.x === x) return true

    for (let i = 0; i < dir.length; i++) {
        const [xoff, yoff] = dir[i]
        if (walk(maze, wall, { x: x + xoff, y: y + yoff }, end, seen, path))
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
    const seen: boolean[][] = []
    for (let i = 0; i < maze.length; i++)
        seen.push(new Array(maze[i].length).fill(false))
    const path: Point[] = []

    walk(maze, wall, start, end, seen, path)

    return path
}
