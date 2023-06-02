const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
]

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

    explore(start)
    return path

    function explore(curr: Point): boolean {
        const { x, y } = curr
        if (x < 0 || maze[0].length <= x || y < 0 || maze.length <= y)
            return false
        if (maze[y][x] === wall) return false
        if (seen[y][x]) return false

        path.push(curr)
        seen[y][x] = true
        if (end.x === x && end.y === y) return true

        for (let i = 0; i < dir.length; i++) {
            const [xoff, yoff] = dir[i]
            if (explore({ x: x + xoff, y: y + yoff })) return true
        }

        path.pop()
        return false
    }
}
