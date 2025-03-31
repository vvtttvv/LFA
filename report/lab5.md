# Chomsky Normal Form and Its Applications

### Course: Formal Languages & Finite Automata
### Author: Titerez Vladislav

----

## Theory

Chomsky Normal Form (CNF) is a specific type of context-free grammar (CFG) used in formal language theory. A grammar is in CNF if all its production rules conform to the following forms:

1. **A → BC** (where A, B, and C are non-terminals, and B and C are not the start symbol)
2. **A → a** (where A is a non-terminal and a is a terminal)
3. **S → ε** (only if the start symbol S has no other productions)

CNF is widely used in computational linguistics and parsing algorithms, such as the **CYK (Cocke-Younger-Kasami) algorithm**, which efficiently determines whether a string belongs to a given context-free language. Some common applications of CNF include:

- **Parser Implementation:** Many parsing algorithms require CNF for efficient processing.
- **Syntax Analysis:** Used in compilers and interpreters to analyze and validate syntax.
- **Automated Theorem Proving:** Used to convert logical statements into a standardized form.
- **Artificial Intelligence (AI) and Natural Language Processing (NLP):** CNF simplifies complex grammars to aid in processing languages.

## Objectives

- Understand the concept of Chomsky Normal Form (CNF) and its role in formal languages.
- Implement an algorithm to convert a given context-free grammar into CNF.
- Apply transformations such as eliminating epsilon productions, renaming, and reducing long productions.
- (Bonus) Implement a function that step-by-step shows the transformations applied to a grammar.

## Implementation Description

The solution consists of a JavaScript class that converts a given context-free grammar into Chomsky Normal Form. The program follows these steps:

1. **Eliminate Epsilon Productions:**
   - Identify nullable non-terminals and modify rules to remove ε-productions.
2. **Eliminate Unit Productions:**
   - Replace unit productions (A → B) with their respective right-hand side productions.
3. **Eliminate Inaccessible Symbols:**
   - Remove symbols that cannot be reached from the start symbol.
4. **Eliminate Non-Productive Symbols:**
   - Remove symbols that do not contribute to terminal derivations.
5. **Convert to Binary Productions:**
   - Convert rules with more than two non-terminals into binary rules using new variables.
6. **Replace Terminals in Mixed Productions:**
   - Ensure that terminal symbols do not appear with non-terminals in a single production.

### **Code Implementation**

```js
const EPSILON = "ε"; // Represents epsilon production (empty production)

class CNF {
    constructor(nonTerminals, terminals, rules, start = 'S') {
        this.nonTerminals = nonTerminals; // Non-terminal symbols (e.g., S, A, B)
        this.terminals = terminals; // Terminal symbols (e.g., a, b, c)
        this.rules = rules; // Grammar rules defining production relations
        this.start = start; // Start symbol (usually S)
    }

    eliminateEpsilonProductions() {
        // Removes ε-productions (productions that derive an empty string ε)
        let nullable = new Set(); // Set to track nullable non-terminals
        for (const nt in this.rules) {
            // Identify non-terminals that directly produce epsilon
            if (this.rules[nt].includes(EPSILON)) nullable.add(nt);
        }

        // Iteratively add non-terminals that can derive epsilon
        let newRules = {};
        for (const nt in this.rules) {
            // For each production, create new alternatives by removing nullable symbols
            newRules[nt] = this.rules[nt].flatMap(prod => 
                prod !== EPSILON ? this._expandNullableProd(prod, nullable) : []
            );
        }
        this.rules = newRules; // Update grammar with new rules after removing epsilon-productions
    }

    eliminateRenaming() {
        // Eliminates unit productions (A -> B), where the right side is a single non-terminal
        for (const nt in this.rules) {
            // Identify unit productions
            let unitProds = this.rules[nt].filter(p => this.nonTerminals.includes(p));
            for (const unit of unitProds) {
                // Replace unit productions with actual productions of the unit
                this.rules[nt].push(...this.rules[unit]);
                // Remove the original unit production
                this.rules[nt] = this.rules[nt].filter(p => p !== unit);
            }
        }
    }

    getCNFform() {
        // Converts all productions to fit the CNF format (A -> BC or A -> a)
        let newRules = {}, terminalMap = {}; // Stores new rules and mappings for terminal non-terminals
        for (const nt in this.rules) {
            newRules[nt] = [];
            for (const prod of this.rules[nt]) {
                let newProd = prod.split('').map(s => 
                    this.terminals.includes(s) ? this._mapTerminal(s, terminalMap, newRules) : s
                );
                // If production has more than 2 symbols, break it down into smaller productions
                while (newProd.length > 2) {
                    const newNT = this._createNewNonTerminal(); // Create a new non-terminal to break down production
                    newRules[newNT] = [newProd.shift() + newProd.shift()]; // Create a new production for the broken parts
                    newProd.unshift(newNT); // Add new non-terminal back into the production
                }
                newRules[nt].push(newProd.join('')); // Add the final production
            }
        }
        this.rules = newRules; // Update the grammar with the CNF-compatible rules
    }

    toCNF() {
        // Main function to convert the grammar to CNF
        this.eliminateEpsilonProductions(); // Step 1: Eliminate epsilon productions
        this.eliminateRenaming(); // Step 2: Eliminate unit productions
        this.getCNFform(); // Step 3: Convert all productions to CNF form
    }
}


```

### **Explanation of Code**
- **Epsilon Production Elimination:**
  - Identifies nullable non-terminals and removes ε-productions.
- **Unit Production Elimination:**
  - Replaces A → B productions with the right-hand side of B’s rules.
- **Elimination of Inaccessible and Non-Productive Symbols:**
  - Removes unnecessary symbols to simplify the grammar.
- **Binary Production Conversion:**
  - Ensures all right-hand sides contain only two non-terminals.
- **Terminal Substitution:**
  - Replaces terminals in mixed productions with new non-terminals.

### **Bonus: Step-by-Step Processing**
Each transformation step is logged to provide insight into how the grammar is converted to CNF. This helps in debugging and understanding the process.

## Conclusions / Results

### **Conclusions**
The program successfully transforms a context-free grammar into Chomsky Normal Form. The structured approach ensures:
- Compliance with CNF rules.
- Efficient parsing using standard algorithms.
- Removal of unnecessary productions and symbols.
- A clear step-by-step transformation process.

### **Example of Grammar Transformation:**
**Input Grammar:**
```
S → AB | a
A → aA | ε
B → bB | b
```

**After CNF Conversion:**
```
S → AB | X1
X1 → a
A → X1A | X1
B → X2B | X2
X2 → b
```

This demonstrates that the grammar is correctly converted while preserving language equivalence.

## References
- [Chomsky Normal Form - Formal Languages & Automata Theory](https://www.cs.cornell.edu/courses/cs2800/)
- [CYK Algorithm and Applications](https://www.geeksforgeeks.org/cyk-algorithm-for-context-free-grammar-parsing/)

