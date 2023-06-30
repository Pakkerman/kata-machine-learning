type TrieNode = {
  char: string
  next?: TrieNode
  children?: TrieNode
  isEnd: boolean
}

export default class Trie {
  private root: TrieNode
  constructor() {
    this.root = this.createNode("")
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
    this.deleteWord(this.root, item, 0)
  }
  private deleteWord(curr: TrieNode, item: string, idx: number): boolean {
    if (idx === item.length) {
      if (!curr.isEnd) return false
      curr.isEnd = false
      return curr.children === undefined
    }

    const char = item[idx]
    let child = curr.children
    let prev: TrieNode | undefined = undefined

    while (child) {
      if (child.char === char) break
      prev = child
      child = child.next
    }

    if (!child) return false
    if (!this.deleteWord(child, item, idx + 1)) return false

    if (prev) prev.next = child.next
    else curr.children = child.next

    return curr.children === undefined
  }

  find(partial: string): string[] {
    if (!partial || partial === "") return []

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

    this.getWordList(curr, partial, out)
    return out
  }
  private getWordList(curr: TrieNode, prefix: string, out: string[]): void {
    if (curr.isEnd) out.push(prefix)

    let child = curr.children
    while (child) {
      this.getWordList(child, prefix + child.char, out)
      child = child.next
    }
  }

  private createNode(char: string): TrieNode {
    return { char, isEnd: false }
  }
}
