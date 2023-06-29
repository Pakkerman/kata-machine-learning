type TrieNode = {
  char: string
  children?: TrieNode
  next?: TrieNode
  isEnd: boolean
}

export default class Trie {
  root: TrieNode
  constructor() {
    this.root = this.createNode()
  }

  insert(item: string): void {
    if (item === "") return

    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i]
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
    if (item === "") return
    this.removeWord(this.root, item, 0)
  }

  private removeWord(curr: TrieNode, item: string, idx: number): boolean {
    if (item.length === idx) {
      if (!curr.isEnd) return false
      curr.isEnd = false
      return curr.children === undefined
    }

    const char = item[idx].toLowerCase()
    let child: TrieNode | undefined = curr.children
    let prev: TrieNode | undefined

    while (child) {
      if (child.char === char) break
      prev = child
      child = child.next
    }

    if (!child) return false
    if (!this.removeWord(child, item, idx + 1)) return false

    if (prev) {
      prev.next = child.next
    } else {
      curr.children = child.next
    }

    return curr.children === undefined
  }

  find(partial: string): string[] {
    if (partial === "") return []
    const out: string[] = []

    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i]
      let child = curr.children
      while (child) {
        if (child.char === char) break
        child = child.next
      }

      if (!child) return out

      curr = child
    }

    this.getWords(curr, partial, out)
    return out
  }

  private getWords(curr: TrieNode, prefix: string, out: string[]): void {
    if (curr.isEnd) out.push(prefix)

    let child = curr.children
    while (child) {
      this.getWords(child, prefix + child.char, out)
      child = child.next
    }
  }

  private createNode(char: string = ""): TrieNode {
    return { char, isEnd: false }
  }
}
