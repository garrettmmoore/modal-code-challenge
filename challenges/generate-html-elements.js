/**
 * A node representing an element to render on the dom
 */
 class Node {
    /**
     * @param {string} tag The type of tag to assign
     * @param {string} text The text to display
     * @param {Node[]} children The child nodes
     */
    constructor(tag, text, children) {
        /** @typedef string The tag type */
        this.tag = tag;

        /** @typedef string The text to display within the current div */
        this.text = text;

        /** @typedef Node[] The nested node */
        this.children = children;
    }
}

/**
 * A document representing the entry point of the Dom tree content
 */
class Doc {
    /**
     * @param {Node} rootNode The root node of the document tree
     */
    constructor(rootNode) {
        this.root = rootNode;
        this.result = [];
        this.openTagStack = [];
        this.closeTagStack = [];
    }

    /**
     * Generates and prints the html tags to the console using depth first search
     * pre-order traversal
     */
    render() {
        // Initialize the open tag stack with the root node
        this.openTagStack.push(this.root);

        // Traverse through the nodes with pre-order DFS
        while (this.openTagStack.length !== 0) {
            // Remove the node from the top of the stack
            const node = this.openTagStack.pop();

            // Check if node is a leaf node
            if (node.children.length === 0) {
                this.addLeaf(node);
                continue;
            }

            // Add tag to the close tag stack
            this.closeTagStack.push(node.tag);

            // Add open tag to the result
            this.addOpenTag(node.tag);

            // Add the current node's children to the top of the open tag stack
            if (node.children.length > 0) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    this.openTagStack.push(node.children[i]);
                }
            }
        }

        // Add the closing tags to the result
        this.closeTagStack.reverse().forEach(tag => this.addCloseTag(tag));

        return this.result;
    }

    /**
     * Adds the opening tag of the node to the result
     * @private
     * @example <div>
     * @param {string} tag The opening tag of the node
     */
    addOpenTag(tag) {
        let openTag = `<${tag}>`;
        this.result.push(openTag);
    }

    /**
     * Adds the closing tag of the node to the result
     * @private
     * @example </div>
     * @param {string} tag The closing tag
     */
    addCloseTag(tag) {
        let closeTag = `</${tag}>`;
        this.result.push(closeTag);
    }

    /**
     * Adds the leaf node (node with no children) to the result
     * @private
     * @example <p> hello world </p>
     * @param {Node} node Node that contains no children
     */
    addLeaf(node) {
        let leaf = `<${node.tag}> ${node.text} </${node.tag}>`;
        this.result.push(leaf);
    }
}

/**
 * Runs an individual test case
 * @param {string} expected The expected output
 * @param {string} output The actual output
 * @param {number} testCaseNumber The current test case number
 */
function test(expected, output, testCaseNumber) {
    let logMessage = '';
    const result = arrayEquals(expected, output);

    if (result) {
        logMessage = `\nTest #${testCaseNumber} --> Passed`;
        logMessage += `\nYour output:\n`;
    } else {
        logMessage = '';
        logMessage += `\nTest #${testCaseNumber} --> Failed`;
        logMessage += `\nExpected: ${expected}`;
        logMessage += `\nYour output: ${output}`;
    }

    return logMessage;
}

/**
 * Helper function to determine if two different arrays contain all of the same values
 * @param {[]} a The array containing the expected values
 * @param {[]} b The array containing the values in question
 */
function arrayEquals(a, b) {
    return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
    );
}

/**
 * Run all of the tests
 */
function runAllTests() {
    let testCaseNumber = 1;

    // Initialize a tree of nodes
    const inputNodes = new Node('html', null, [
        new Node('div', null, [
            new Node('p', 'hello world', []),
            new Node('p', 'hello world', [])
        ])
    ]);

    const expected = [
        '<html>',
        '<div>',
        '<p> hello world </p>',
        '<p> hello world </p>',
        '</div>',
        '</html>'
    ];

    // Initialize a new document and print the html tags to the console
    const doc = new Doc(inputNodes);
    const output = doc.render();
    console.log(test(expected, output, testCaseNumber++));
    output.forEach(tag => console.log(tag));
}

runAllTests();
