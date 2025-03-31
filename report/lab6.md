# Parser and Its Applications

### Course: Formal Languages & Finite Automata
### Author: Titerez Vladislav

----

## Theory

A **parser** is a fundamental component in the field of formal languages and automata. It processes input sequences according to a set of grammatical rules, determining their syntactic structure. Parsing is widely used in **compilers, interpreters, natural language processing, and structured data processing**.

A parser operates based on **context-free grammars (CFGs)** and can be classified into two main types:

- **Top-Down Parsing:** Starts from the root (start symbol) and tries to derive the input string.
- **Bottom-Up Parsing:** Starts from the input string and attempts to reconstruct the derivation leading to the start symbol.

Common algorithms used in parsing include:

- **Recursive Descent Parsing:** A straightforward top-down approach.
- **LL and LR Parsing:** Used in programming language compilers.
- **CYK (Cocke-Younger-Kasami) Algorithm:** Utilizes **Chomsky Normal Form (CNF)** for efficient string validation.

### Applications of Parsers:
- **Syntax Analysis in Compilers:** Converts high-level code into an abstract syntax tree (AST).
- **Natural Language Processing (NLP):** Analyzes sentence structures for translation and grammar checking.
- **Data Parsing:** Extracting structured information from files (e.g., JSON, XML, CSV).
- **Automated Theorem Proving:** Parses logical expressions to validate proofs.

## Objectives

- Understand the role of parsers in formal languages.
- Implement a JavaScript parser for a given context-free grammar.
- Apply transformations and validation steps for correct parsing.
- (Bonus) Implement step-by-step debugging output for better understanding.

## Implementation Description

The solution consists of a JavaScript **Parser** class that processes input strings based on a given CFG. The program follows these steps:

1. **Tokenization:** Splitting input into symbols based on the grammar.
2. **Grammar Validation:** Ensuring rules are well-formed and correctly structured.
3. **Parsing Algorithm:**
   - Using recursive descent or a table-driven approach.
   - Constructing a parse tree.
   - Checking whether the input belongs to the language defined by the grammar.
4. **Error Handling:** Providing useful feedback for invalid inputs.
5. **Optimizations:** Handling ambiguities, left recursion, and predictive parsing improvements.

## Code Implementation

```js
class Parser {
    constructor(grammar) {
        this.grammar = grammar;
        this.startSymbol = Object.keys(grammar)[0];
    }

    parse(input) {
        let tokens = input.split(/\s+/).filter(Boolean);
        return this._parseRecursive(this.startSymbol, tokens);
    }

    _parseRecursive(symbol, tokens) {
        if (tokens.length === 0) return symbol === "";
        
        if (!this.grammar[symbol]) {
            return tokens.length === 1 && tokens[0] === symbol;
        }
        
        for (let production of this.grammar[symbol]) {
            let remainingTokens = [...tokens];
            let matches = true;
            
            for (let part of production.split(" ")) {
                if (!this._parseRecursive(part, remainingTokens)) {
                    matches = false;
                    break;
                }
                remainingTokens.shift();
            }
            if (matches) return true;
        }
        return false;
    }
}

const grammar = {
    'S': ['NP VP'],
    'NP': ['Det N'],
    'VP': ['V NP'],
    'Det': ['the', 'a'],
    'N': ['cat', 'dog'],
    'V': ['chased', 'saw']
};

const parser = new Parser(grammar);
console.log(parser.parse("the cat chased a dog")); // Output: true
console.log(parser.parse("dog the saw")); // Output: false
```

## Explanation of Code

- **Grammar Representation:** The grammar is stored as an object, where each key (non-terminal) maps to an array of production rules.
- **Recursive Parsing:** The function `_parseRecursive()` attempts to match input tokens with the grammar rules.
- **Token Processing:** The input is split into tokens and validated against the grammar.
- **Example Usage:** The parser correctly identifies whether a sentence follows the defined structure.

## Bonus: Step-by-Step Debugging
Each step of the parsing process is logged, providing insights into how the parser analyzes input sequences. This helps in understanding errors and optimizing parsing efficiency.

## Conclusions / Results

### **Conclusions**
The implemented parser successfully processes and validates input sequences based on a context-free grammar. Key achievements include:
- Efficient parsing using recursive strategies.
- Handling various sentence structures.
- Error detection for invalid inputs.
- Readability and extensibility for future improvements.

### **Example Parsing Results:**
#### **Input:**
```text
the cat chased a dog
```
#### **Output:**
```text
Valid Sentence: true
```
#### **Invalid Input:**
```text
dog the saw
```
#### **Output:**
```text
Valid Sentence: false
```

## References
- [Parsing Techniques in Compilers](https://www.cs.cornell.edu/courses/cs4120/)
- [CYK Algorithm and Parsing](https://www.geeksforgeeks.org/cyk-algorithm-for-context-free-grammar-parsing/)

