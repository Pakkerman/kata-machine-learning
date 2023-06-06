class TrieNode {
    char: string
    isEnd: boolean
    next?: TrieNode
    children?: TrieNode
}

export default class Trie {
    root: TrieNode

    constructor() {
        this.root = { char: "root", isEnd: false }
    }

    insert(item: string): void {
        // 1. Iterate through the input
        // 2. Find if root's children containt the first letter
        //      - Iterate throught children
        //          - If True, flip foundChild to true
        //          - If False, create child
        // get the first word of the string

        let curr = this.root
        for (let i = 0; i < item.length; i++) {
            let found = false
            let childNode = curr.children
            while (childNode) {
                if (childNode.char === item[i]) {
                    found = true
                    curr = childNode
                    break
                }
                childNode = childNode.next
            }
            if (!found) {
                const node: TrieNode = { char: item[i], isEnd: false }
                node.next = curr.children
                curr.children = node
                curr = curr.children
            }
        }

        curr.isEnd = true
    }

    find(partial: string): string[] {
        const result: string[] = []
        let curr = this.root
        for (let i = 0; i < partial.length; i++) {
            const char = partial[i]
            let childNode = curr.children
            while (childNode) {
                if (childNode.char === char) {
                    curr = childNode
                    break
                }
                childNode = childNode.next
            }
            if (!childNode) return result
        }

        this.collectWords(curr, partial, result)
        return result
    }

    delete(item: string): void {
        this.deleteHelper(this.root, item, 0)
    }

    private deleteHelper(curr: TrieNode, item: string, idx: number): boolean {
        // Base Case, reached the end
        if (idx === item.length) {
            if (!curr.isEnd) return false
            curr.isEnd = false
            return curr.children === undefined
        }

        const char = item[idx]
        let childNode = curr.children
        let prev: TrieNode | undefined
        while (childNode) {
            if (childNode.char === char) {
                if (this.deleteHelper(childNode, item, idx + 1))
                    if (!prev) {
                        curr.children = childNode.next
                    } else {
                        prev.next = childNode.next
                    }
            }

            prev = childNode
            childNode = childNode.next
        }
        return false
    }

    private collectWords(
        node: TrieNode,
        prefix: string,
        result: string[],
    ): void {
        // Base Case
        if (node.isEnd) result.push(prefix)
        // Recurse
        let childNode = node.children
        while (childNode) {
            this.collectWords(childNode, prefix + childNode.char, result)
            childNode = childNode.next
        }
    }
    //fa

    // collectwords(f, f, [])
    // collectwords(a, fa , [])
    //     if (node.isEnd) result.push(prefix) // If reached end, return prefix

    //     let childNode = node.children // F
    //     while (childNode) {
    //         this.collectWords(childNode, prefix + childNode.char, result)
    //         childNode = childNode.next
    //     }
    // }
}

function printChildren(curr: TrieNode | undefined): string[] {
    if (!curr) return ["no children in this node"]
    const res: string[] = []
    let ptr = curr.children
    if (!ptr) return res
    while (ptr) {
        res.push(ptr.char)
        ptr = ptr.next
    }
    return res
}
