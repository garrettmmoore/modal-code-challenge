/**
 * Given a list of instances (substring) and a string of characters,
 * remove all instances that exist in the string.
 *
 * Requirements:
 * - An instance should only be removed from the modified string if it
 *   also exists in the original string
 * - If the modified string contains more than one of the same instance,
 *   remove the duplicate
 *
 * @example
 * absdefge - ab --> sdefge
 * sdefge   - fg --> sdee
 * sdee     - ee --> sdee (it was not part of the original string)
 * removeInstances("absdefge", ["ab", "fg", "ee"]) —> sdee
 *
 * @param {string} originalStr The original string of characters
 * @param {string[]} instances An array of instances (substrings) to
 * remove from the original string
 *
 * @return {string} Returns a modified version of the original string
 * with all instances removed
 */
 function removeInstances(originalStr, instances) {
    let modifiedStr = originalStr;

    // Iterate through the instances
    for (let index = 0; index < instances.length; index++) {
        const currentInstance = instances[index];

        // Check if the instance exists in both the original string and modified string
        // Conditionally iterate to remove any duplicate instances
        while (
            originalStr.includes(currentInstance) &&
            modifiedStr.includes(currentInstance)
        ) {
            // Remove the instance from the modified string
            modifiedStr = modifiedStr.replace(currentInstance, '');
        }
    }

    return modifiedStr;
}

/**
 * Runs an individual test
 * @param {string} expected The expected output
 * @param {string} output The actual output
 * @param {number} testCaseNumber The current test case number
 */
function test(expected, output, testCaseNumber) {
    let logMessage = '';
    const result = expected === output;

    if (result) {
        logMessage = `\nTest #${testCaseNumber} --> Passed`;
        logMessage += `\nYour output: ${output}`;
    } else {
        logMessage = '';
        logMessage += `\nTest #${testCaseNumber} --> Failed`;
        logMessage += `\nExpected: ${expected}`;
        logMessage += `\nYour output: ${output}`;
    }

    return logMessage;
}

/**
 * Runs all of the tests cases
 */
function runAllTests() {
    let testCaseNumber = 1;

    // The original test case
    const inputString1 = 'absdefge';
    const inputArray1 = ['ab', 'fg', 'ee'];
    const expected1 = 'sdee';
    const output1 = removeInstances(inputString1, inputArray1);
    console.log(test(expected1, output1, testCaseNumber++));

    // Test triple character instances
    const inputString2 = 'absdfgeee';
    const inputArray2 = ['ab', 'fg', 'eee'];
    const expected2 = 'sd';
    const output2 = removeInstances(inputString2, inputArray2);
    console.log(test(expected2, output2, testCaseNumber++));

    // Test duplicate instances
    const inputString3 = 'absfgdefge';
    const inputArray3 = ['ab', 'fg', 'ee'];
    const expected3 = 'sdee';
    const output3 = removeInstances(inputString3, inputArray3);
    console.log(test(expected3, output3, testCaseNumber++));
}

runAllTests();
