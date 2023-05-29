class TrieNode {
    value: string
    isEndOfWord: boolean
    next: TrieNode | null
    children: TrieNode | null

    constructor(value: string) {
        this.value = value
        this.isEndOfWord = false
        this.next = null
        this.children = null
    }
}

export default class Trie {
    root: TrieNode

    constructor() {
        this.root = new TrieNode("")
    }

    insert(item: string): void {
        // get the first word of the string
        let currentNode = this.root
        for (let i = 0; i < item.length; i++) {
            const char = item[i]
            let foundChild = false

            // Check if the current character already exists as a child
            let childNode = currentNode.children
            while (childNode !== null) {
                if (childNode.value === char) {
                    foundChild = true
                    break
                }
                childNode = childNode.next
            }

            if (!foundChild) {
                const newNode = new TrieNode(char)
                newNode.next = currentNode.children
                currentNode.children = newNode
            }

            currentNode = childNode || currentNode.children!
        }

        currentNode.isEndOfWord = true
    }

    delete(item: string): void {
        this.deleteHelper(this.root, item, 0)
    }

    private deleteHelper(node: TrieNode, item: string, index: number): boolean {
        if (index === item.length) {
            if (!node.isEndOfWord) {
                return false
            }
            node.isEndOfWord = false
            return node.children === null
        }

        const char = item[index]
        let childNode = node.children
        let prevNode: TrieNode | null = null

        while (childNode !== null) {
            if (childNode.value === char) {
                const shouldDeleteNode = this.deleteHelper(
                    childNode,
                    item,
                    index + 1,
                )

                if (shouldDeleteNode) {
                    if (prevNode === null) {
                        node.children = childNode.next
                    } else {
                        prevNode.next = childNode.next
                    }
                    return node.children === null
                }
            }

            prevNode = childNode
            childNode = childNode.next
        }

        return false
    }

    find(partial: string): string[] {
        const result: string[] = []
        let currentNode = this.root

        for (let i = 0; i < partial.length; i++) {
            const char = partial[i]
            let childNode = currentNode.children

            while (childNode !== null) {
                if (childNode.value === char) {
                    currentNode = childNode
                    break
                }
                childNode = childNode.next
            }

            if (childNode === null) {
                return result
            }
        }

        this.collectWords(currentNode, partial, result)

        return result
    }

    private collectWords(
        node: TrieNode,
        prefix: string,
        result: string[],
    ): void {
        if (node.isEndOfWord) {
            result.push(prefix)
        }

        let childNode = node.children
        while (childNode !== null) {
            this.collectWords(childNode, prefix + childNode.value, result)
            childNode = childNode.next
        }
    }
}
