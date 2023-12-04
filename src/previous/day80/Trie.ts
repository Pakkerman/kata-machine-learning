class TrieNode {
  word?: string
  children: Map<string, TrieNode>
  constructor() {
    this.children = new Map()
  }
}

export default class Trie {
  root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  insert(item: string): void {
    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i]
      if (!curr.children.has(char)) curr.children.set(char, new TrieNode())
      curr = curr.children.get(char)!
    }
    curr.word = item
  }
  delete(item: string): void {
    recurse(this.root)

    function recurse(curr: TrieNode, idx: number = 0): boolean {
      if (idx === item.length) {
        if (curr.word) delete curr.word
        return curr.children.size === 0
      }

      const char = item[idx]
      const child = curr.children.get(char)
      if (!child) return false
      if (!recurse(child, idx + 1)) return false

      curr.children.delete(char)

      return curr.children.size === 0
    }
  }
  find(partial: string): string[] {
    const out: string[] = []
    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i]
      if (!curr.children.has(char)) return out
      curr = curr.children.get(char)!
    }

    recurse(curr)
    return out

    function recurse(curr: TrieNode): void {
      if (curr.word) out.push(curr.word)
      for (const child of curr.children.values()) {
        recurse(child)
      }
    }
  }
}