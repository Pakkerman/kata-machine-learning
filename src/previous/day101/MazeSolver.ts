const dir = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point
): Point[] {
  const path: Point[] = []
  const seen: boolean[][] = Array.from({ length: maze.length }, (_, i) =>
    new Array(maze[i].length).fill(false)
  )

  recurse(start)
  return path

  function recurse(curr: Point): boolean {
    const { x, y } = curr
    if (y < 0 || maze.length <= y) return false
    if (x < 0 || maze[y].length <= x) return false
    if (maze[y][x] === wall) return false
    if (seen[y][x]) return false

    seen[y][x] = true
    path.push(curr)

    if (end.y === y && end.x === x) return true

    for (let i = 0; i < dir.length; i++) {
      const [xoff, yoff] = dir[i]
      if (recurse({ x: x + xoff, y: y + yoff })) return true
    }

    path.pop()
    return false
  }
}

