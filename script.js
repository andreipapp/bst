class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }
    createTree(start, end, array) {
        if (start > end) {
            return null;
        }
        const mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);

        node.left = this.createTree(start, mid - 1, array);
        node.right = this.createTree(mid + 1, end, array);

        return node;
    }
    buildTree(array) {
        array = array.sort((a, b) => a - b);
        let unique = [];
        for (let i = 0; i < (array.length) - 1; i++) {
            let ok = 1;
            for (let j = i + 1; j < array.length; j++) {
                if (array[i] === array[j]) {
                    ok = 0;
                }
            }
            if (ok) {
                unique.push(array[i]);
            }
        }
        return this.createTree(0, unique.length - 1, unique);
    }
    insert(value) {
        let currentNode = this.root;
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        while (true) {
            if (value < currentNode.value) {
                if (currentNode.left === null) {
                    currentNode.left = newNode;
                    return;
                } else {
                    currentNode = currentNode.left;
                }
            } else {
                if (currentNode.right === null) {
                    currentNode.right = newNode;
                    return;
                } else {
                    currentNode = currentNode.right;
                }
            }
        }
    }
    deleteItem(value) {
        this.root = this._deleteNode(this.root, value);
    }

    _deleteNode(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this._deleteNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value);
            return node;
        } else {

            if (node.left === null && node.right === null) {
                return null;
            }

            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }

            let successorParent = node;
            let successor = node.right;

            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }

            if (successorParent !== node) {
                successorParent.left = successor.right;
            } else {
                successorParent.right = successor.right;
            }

            node.value = successor.value;

            return node;
        }
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};