type Node = {
  char: string
  next?: Node
  children?: Node
  isEnd: boolean
}

export default class Trie {
  private root: Node
  constructor() {
    this.root = { char: " ", isEnd: false }
  }

  insert(item: string): void {
    if (!item) return
    let curr = this.root

    for (let i = 0; i < item.length; i++) {
      const char = item[i].toLowerCase()
      let childNode = curr.children
      // Iterate till find matching char
      while (childNode) {
        if (char === childNode.char) break
        childNode = childNode.next
      }

      // If found, set curr and continue iterate
      if (childNode) {
        curr = childNode
        continue
      }

      // If not found, create a new node
      const node: Node = { char, isEnd: false }
      node.next = curr.children
      curr.children = node
      curr = node
    }

    curr.isEnd = true
  }

  delete(item: string): void {
    this.deleteHelper(this.root, item, 0)
  }
  private deleteHelper(curr: Node, item: string, idx: number): boolean {
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
    let childNode = curr.children
    let prev: Node | undefined = undefined
    while (childNode) {
      if (childNode.char === char) break
      prev = childNode
      childNode = childNode.next
    }
    if (!childNode) return false

    // Recurse - Going down letters one by one and return bool based on base case
    if (!this.deleteHelper(childNode, item, idx + 1)) return false

    // Post - Remove the current node if recurse returns true
    // 1. If there is no prev curr.children will point to the next child and omit the current one
    // 2. Else don't need to touch curr, just jump over current childNode by connect prev to the next childNode
    if (prev) {
      prev.next = childNode.next
    } else {
      curr.children = childNode.next
    }
    // Free childNode
    childNode = undefined
    return curr.children === undefined
  }

  find(partial: string): string[] {
    if (partial.length === 0 || !partial) return []

    const result: string[] = []
    let curr = this.root

    for (let i = 0; i < partial.length; i++) {
      const char = partial[i].toLowerCase()
      let childNode = curr.children

      while (childNode) {
        if (childNode.char === char) break
        childNode = childNode.next
      }

      if (!childNode) return result
      curr = childNode
    }

    getWords(curr, partial, result)
    return result
  }
}
function getWords(curr: Node, prefix: string, result: string[]): void {
  if (curr.isEnd) result.push(prefix)

  let childNode = curr.children
  while (childNode) {
    getWords(childNode, prefix + childNode.char, result)
    childNode = childNode.next
  }
}
