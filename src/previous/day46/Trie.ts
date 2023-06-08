type Node = {
  char: string
  next?: Node
  children?: Node
  isEnd?: boolean
}
export default class Trie {
  private root: Node
  constructor() {
    this.root = this.createNode(" ")
  }

  insert(item: string): void {
    if (!item || item.length === 0) return
    let curr = this.root

    for (let i = 0; i < item.length; i++) {
      let char = item[i].toLowerCase()
      let child = curr.children
      while (child) {
        if (child.char === char) break
        child = child.next
      }

      if (child) {
        curr = child
        continue
      }

      const node = this.createNode(char)
      node.next = curr.children
      curr.children = node
      curr = node
    }

    curr.isEnd = true
  }
  delete(item: string): void {
    this.deleteWord(this.root, item, 0)
  }
  private deleteWord(curr: Node, item: string, idx: number): boolean {
    //  Base cases
    if (idx === item.length) {
      if (!curr.isEnd) return false
      curr.isEnd = false
      return curr.children === undefined
    }
    // pre
    // 1. Get current letter, curr's children and prev ptr
    // 2. Travers and find the matching children char
    const char = item[idx].toLowerCase()
    let child = curr.children
    let prev: Node | undefined
    while (child) {
      if (child.char === char) break
      prev = child = child.next
    }

    // Recurse - Going down letters one by one and return bool based on base case
    if (!child) return false
    if (!this.deleteWord(child, item, idx + 1)) return false

    // Post - Remove the current node if recurse returns true
    // 1. If there is no prev curr.children will point to the next child and omit the current one
    // 2. Else don't need to touch curr, just jump over current childNode by connect prev to the next childNode
    if (prev) {
      prev.next = child.next
    } else {
      curr.children = child.next
    }

    // Free childNode
    child = undefined
    return curr.children === undefined
  }

  find(partial: string): string[] {
    const out: string[] = []
    if (!partial || partial.length === 0) return out
    let curr = this.root

    for (let i = 0; i < partial.length; i++) {
      const char = partial[i].toLowerCase()
      let child = curr.children
      while (child) {
        if (child.char === char) break
        child = child.next
      }

      if (child) curr = child
    }

    this.getWords(curr, partial, out)
    return out
  }
  private getWords(curr: Node, prefix: string, result: string[]): void {
    if (curr.isEnd) result.push(prefix)

    let child = curr.children
    while (child) {
      this.getWords(child, prefix + child.char, result)
      child = child.next
    }
  }

  private createNode(val: string): Node {
    return { char: val, isEnd: false }
  }
}
