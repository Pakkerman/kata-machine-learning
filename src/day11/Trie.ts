// Node structure, a boolean to mark if is word and a children array to store nodes
type TrieNode = {
    isWord: boolean
    children: TrieNode[]
}

export default class Trie {
    root: TrieNode
    constructor() {
        this.root = { children: new Array(26).fill(undefined), isWord: false }
    }

    // get head
    // go through characters and check if exist, move curr
    // if not, create and move curr
    // after iteration, set curr.isWord to true
    insert(item: string): void {
        let curr = this.root
        for (let i = 0; i < item.length; i++) {
            const idx = this.getCharIdx(item[i])
            if (!curr.children[idx]) {
                const node = this.createNode()
                curr.children[idx] = node
            }
            curr = curr.children[idx]
        }
        curr.isWord = true
    }

    // use recursion, to get to the node and delete back out
    delete(item: string): void {
        let curr = this.root
        for (let i = 0; i < item.length; i++) {
            const idx = this.getCharIdx(item[i])
            curr = curr.children[idx]
        }
        curr.isWord = false
    }

    // Get curr down to the last character, and do bst down to each branch?

    find(partial: string): string[] {
        let curr = this.root
        for (let i = 0; i < partial.length; i++) {
            const idx = this.getCharIdx(partial[i])
            if (!curr.children[idx]) return []
            curr = curr.children[idx]
        }
        return this.dfs(curr, partial)
    }

    private dfs(node: TrieNode, prefix: string): string[] {
        const out = []
        if (node.isWord) out.push(prefix)

        for (let i = 0; i < node.children.length; i++) {
            const curr = node.children[i]
            if (!curr) continue
            const char = String.fromCharCode(i + 97)
            out.push(...this.dfs(curr, prefix + char))
        }

        return out
    }

    private createNode(): TrieNode {
        return { isWord: false, children: new Array(26).fill(undefined) }
    }

    private getCharIdx(char: string): number {
        return char.toLowerCase().charCodeAt(0) - 97
    }
}
