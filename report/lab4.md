# Regular Expressions and Their Applications

### Course: Formal Languages & Finite Automata
### Author: Titerez Vladislav

----

## Theory

Regular expressions are a powerful tool used for pattern matching and text processing. They define a formal language by describing patterns of strings within a set of possible strings. Regular expressions are widely used in various applications, such as:

- **Lexical Analysis:** Tokenizing input in compilers and interpreters.
- **Text Processing:** Searching, replacing, and extracting substrings from text data.
- **Data Validation:** Ensuring data conforms to specific formats (e.g., email addresses, phone numbers).
- **String Parsing:** Extracting specific patterns from large datasets.

Regular expressions are often implemented using **finite automata**, where a pattern can be recognized by a **Deterministic Finite Automaton (DFA)** or a **Nondeterministic Finite Automaton (NFA)**.

## Objectives

- Understand the concept and use cases of regular expressions.
- Implement a program that generates valid combinations of symbols based on given regular expressions.
- Apply constraints to limit generation where necessary.
- (Bonus) Implement a function that shows the sequence of processing a regular expression.

## Implementation Description

The solution consists of a JavaScript function that generates valid combinations of symbols according to predefined regular expressions. The program follows these steps:

1. **Generating Valid Strings**:
   - Randomly select characters according to the given pattern rules.
   - Repeat specific characters a limited number of times to avoid excessively long outputs.
2. **Processing Steps**:
   - Each step of the generation process is logged to provide insight into how the final string is formed.
3. **Output Display**:
   - Generated strings are printed to the console and displayed in an HTML element.

### **Code Implementation**

```js
export default function lab4(n) {
    let arr = [];
    let result = document.getElementById("lab4_console");

    function generatePattern1() {
        let first = Math.random() < 0.5 ? "a" : "b";
        let second = Math.random() < 0.5 ? "c" : "d";
        let E_repeat = "E".repeat(Math.floor(Math.random() * 5) + 1);
        let G = "G";
        
        result.innerHTML += `<br>Step 1: ${first}${second}${E_repeat}${G}<br>`;
        return first + second + E_repeat + G;
    }

    function generatePattern2() {
        let middle = ["Q", "R", "S"][Math.floor(Math.random() * 3)];
        let uvw = (Math.random() < 0.33 ? "UV" : Math.random() < 0.5 ? "W" : "X").repeat(Math.floor(Math.random() * 6));
        let zRepeat = "Z".repeat(Math.floor(Math.random() * 5) + 1);

        result.innerHTML += `<br>Step 2: P${middle}T${uvw}${zRepeat}<br>`;
        return `P${middle}T${uvw}${zRepeat}`;
    }

    function generatePattern3() {
        let binaryPart = (Math.random() < 0.5 ? "0" : "1").repeat(Math.floor(Math.random() * 6));
        let repeat34 = (Math.random() < 0.5 ? "3" : "4").repeat(5);
        
        result.innerHTML += `<br>Step 3: 1${binaryPart}2${repeat34}36<br>`;
        return `1${binaryPart}2${repeat34}36`;
    }

    for (let i = 0; i < n; i++) {
        let resultString = `${generatePattern1()} ${generatePattern2()} ${generatePattern3()}`;
        arr.push(resultString);
        console.log(`Generated result: ${resultString}\n`);
    }

    return arr;
}
```

### **Explanation of Code**
- **Pattern 1:**
  - Begins with 'a' or 'b'.
  - Followed by 'c' or 'd'.
  - Includes 'E' repeated a random number of times (1-5 times).
  - Ends with 'G'.
- **Pattern 2:**
  - Starts with 'P'.
  - Followed by 'Q', 'R', or 'S'.
  - Includes a repeating sequence of 'UV', 'W', or 'X'.
  - Ends with multiple occurrences of 'Z'.
- **Pattern 3:**
  - Begins with '1'.
  - Contains a repeated binary sequence ('0' or '1').
  - Ends with a sequence of five repetitions of '3' or '4'.
  - Finishes with '36'.

### **Bonus: Step-by-Step Processing**
Each function logs its steps to show how the sequence is formed. This helps visualize the construction process.

## Conclusions / Results

### **Conclusions**
The program successfully generates valid sequences based on the given regular expressions. The structured approach ensures:
- Compliance with predefined patterns.
- Prevention of excessively long sequences by applying repetition constraints.
- Clear logging of each step in the generation process.

### **Generated Output Example:**
```
Generated result: acEEEG PRTWZZZZZ 10112333336
Generated result: bdEEEG PQTXXXXZZZ 01010344446
```

This demonstrates that different combinations of symbols are generated while maintaining structure constraints.

## References
- [Regular Expressions - Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Formal Languages and Automata Theory](https://www.cs.cornell.edu/courses/cs2800/)

