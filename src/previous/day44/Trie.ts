type TrieNode = {
  char: string
  next?: TrieNode
  children?: TrieNode
  isEnd: boolean
}

export default class Trie {
  private root: TrieNode
  constructor() {
    this.root = { char: " ", isEnd: false }
  }

  insert(item: string): void {
    if (item.length === 0) return

    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i].toLowerCase()

      let found = false
      let childNode = curr.children
      while (childNode) {
        if (childNode.char === char) {
          found = true
          curr = childNode
          break
        }
        childNode = childNode.next
      }

      if (!found) {
        const node: TrieNode = { char, isEnd: false }
        node.next = curr.children
        curr.children = node
        curr = node
      }
    }
    curr.isEnd = true
  }
  delete(item: string): void {
    this.deleteHelper(this.root, item, 0)
  }

  private deleteHelper(curr: TrieNode, item: string, idx: number): boolean {
    //  Base cases
    if (item.length === idx) {
      if (!curr.isEnd) return false
      curr.isEnd = false
      return curr.children === undefined
    }

    // pre
    // 1. Get current letter, curr's children and prev ptr
    // 2. Travers and find the matching children char
    const char = item[idx].toLowerCase()
    let prev: TrieNode | undefined = undefined
    let childNode = curr.children
    while (childNode) {
      if (childNode.char === char) break

      prev = childNode
      childNode = childNode.next
    }

    // Recurse - Going down letters one by one and return bool based on base case
    if (!childNode) return false
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
    const out: string[] = []
    if (!partial) return out

    // traverse to the last word of the string
    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i].toLowerCase()

      let childNode = curr.children
      if (!childNode) return out

      while (childNode) {
        if (childNode.char === char) {
          curr = childNode
          break
        }
        childNode = childNode.next
      }
    }

    // get the prefix and the last node of the string is exist in the trietree
    this.getWords(curr, partial, out)
    return out
  }

  private getWords(curr: TrieNode, prefix: string, out: string[]): void {
    // BS
    if (curr.isEnd) out.push(prefix)

    let childNode = curr.children
    while (childNode) {
      this.getWords(childNode, prefix + childNode.char, out)

      childNode = childNode.next
    }
  }
}
