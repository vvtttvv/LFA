# Lexer & Scanner

### Course: Formal Languages & Finite Automata
### Author: Titerez Vladislav

----

## Theory

A **Lexer**, also known as a lexical analyzer, is a fundamental component of a compiler or interpreter that processes input text and converts it into a sequence of tokens. A token is a structured representation of meaningful elements in a programming language, such as keywords, identifiers, literals, operators, and punctuation. The lexer plays a crucial role in breaking down the raw input into a form that is easier for subsequent stages, like parsing, to process.  

- A lexer operates using a set of predefined rules, often specified using regular expressions or finite automata, to recognize and classify different tokens. It scans the input sequentially, grouping characters into meaningful units.  
- The concept of lexical analysis can be related to finite automata, as a lexer can be implemented using **Deterministic Finite Automata (DFA)** or **Nondeterministic Finite Automata (NFA)** to efficiently recognize token patterns.  

A **Deterministic Lexer** follows a strict rule where, given a current state and an input character, there is only one possible next state. This approach ensures predictability and efficiency. On the other hand, a **Nondeterministic Lexer** may have multiple possible transitions for a given input, requiring additional steps to resolve ambiguity, such as backtracking or lookahead techniques.  

Lexers can be categorized based on their complexity and functionality:  
- **Simple Lexers** work with a basic set of rules and operate in a single pass, making them efficient for straightforward tokenization tasks.  
- **Complex Lexers** may involve multiple passes, require symbol tables, and handle context-sensitive lexical analysis, such as resolving reserved keywords from identifiers.  

Despite its role as a separate phase in many compiler architectures, lexical analysis is closely tied to syntax analysis, as the output of the lexer serves as the input for the parser. Optimizing the lexer for efficiency ensures faster and more reliable language processing.


## Objectives:

- Understand what lexical analysis [1] is.

- Get familiar with the inner workings of a lexer/scanner/tokenizer.

- Implement a sample lexer and show how it works.

Note: Just because too many students were showing me the same idea of lexer for a calculator, I've decided to specify requirements for such case. Try to make it at least a little more complex. Like, being able to pass integers and floats, also to be able to perform trigonometric operations (cos and sin). But it does not mean that you need to do the calculator, you can pick anything interesting you want

## Implementation Description

The **Lexer** class is responsible for tokenizing an input string into meaningful components, which can then be used for parsing. The lexer scans the input, identifies tokens based on predefined rules, and classifies them into categories such as **keywords**, **identifiers**, **numbers**, **strings**, **operators**, and **punctuation**.

### **Core Functionalities**
1. **Initialization**  
   - The constructor initializes the `input` string, sets the `position` at the start, and prepares an empty `tokens` array to store the recognized tokens.

2. **Tokenization Process**  
   - The `tokenize()` method iterates through the input, skipping whitespace and analyzing characters to determine token types.
   - The lexer processes identifiers and keywords, numbers, string literals, and symbols accordingly.

3. **Character Navigation**  
   - `peek()` allows looking at the current character without consuming it.  
   - `peekAhead(n)` provides a way to inspect characters further ahead.  
   - `advance()` moves the position forward and returns the consumed character.  
   - `isAtEnd()` checks if the end of the input has been reached.

4. **Token Classification**
   - **Identifiers and Keywords** (`tokenizeIdentifierOrKeyword()`)  
     - Recognizes words that start with letters and differentiates between predefined **keywords** and user-defined **identifiers**.
   - **Numbers** (`tokenizeNumber()`)  
     - Extracts sequences of digits and classifies them as **NUMBER_TOKEN**.
   - **String Literals** (`tokenizeString()`)  
     - Handles quoted string values and supports escape sequences.
   - **Symbols and Operators** (`tokenizeSymbol()`)  
     - Identifies **mathematical**, **comparison**, and **punctuation** symbols.
     - Supports multi-character operators such as `>=` and `<=`.

5. **Error Handling**  
   - The lexer throws errors for unexpected characters or unterminated string literals.

### **Example Tokenization**
Given the input:
```js
let variable = "C6H6";
if (possible("C6H6" + variable)) {
  let reaction = resolve("C6H6" + variable);
}
```
The lexer will produce:
```json
[
  { "type": "KEYWORD_TOKEN", "value": "let" },
  { "type": "IDENTIFIER_TOKEN", "value": "variable" },
  { "type": "OPERATOR_TOKEN", "value": "=" },
  { "type": "STRING_TOKEN", "value": "C6H6" },
  { "type": "PUNCTUATION_TOKEN", "value": ";" },
  { "type": "KEYWORD_TOKEN", "value": "if" },
  { "type": "PUNCTUATION_TOKEN", "value": "(" },
  { "type": "KEYWORD_TOKEN", "value": "possible" },
  { "type": "PUNCTUATION_TOKEN", "value": "(" },
  { "type": "STRING_TOKEN", "value": "C6H6" },
  { "type": "OPERATOR_TOKEN", "value": "+" },
  { "type": "IDENTIFIER_TOKEN", "value": "variable" },
  { "type": "PUNCTUATION_TOKEN", "value": ")" },
  { "type": "PUNCTUATION_TOKEN", "value": ")" },
  { "type": "PUNCTUATION_TOKEN", "value": "{" },
  { "type": "KEYWORD_TOKEN", "value": "let" },
  { "type": "IDENTIFIER_TOKEN", "value": "reaction" },
  { "type": "OPERATOR_TOKEN", "value": "=" },
  { "type": "KEYWORD_TOKEN", "value": "resolve" },
  { "type": "PUNCTUATION_TOKEN", "value": "(" },
  { "type": "STRING_TOKEN", "value": "C6H6" },
  { "type": "OPERATOR_TOKEN", "value": "+" },
  { "type": "IDENTIFIER_TOKEN", "value": "variable" },
  { "type": "PUNCTUATION_TOKEN", "value": ")" },
  { "type": "PUNCTUATION_TOKEN", "value": ";" },
  { "type": "PUNCTUATION_TOKEN", "value": "}" }
]
```
This structured output enables further processing in a compiler or interpreter.


```js

export default class Lexer {
    constructor(input) {
      this.input = input;
      this.position = 0;
      this.tokens = [];
    }
  
    isAtEnd() {
      return this.position >= this.input.length;
    }
   
    peek() {                // Look at the current character without consuming it
      return this.input[this.position];
    }
  
    
    peekAhead(n = 1) {      // Look ahead by n characters without consuming them
      if (this.position + n >= this.input.length) return null;
      return this.input[this.position + n];
    }
  
    advance() {             // Consume and return the current character
      return this.input[this.position++];
    }
  
    tokenize() {
      while (!this.isAtEnd()) {
        this.skipWhitespace();
        if (this.isAtEnd()) break;
  
        const ch = this.peek();
  
        if (this.isAlpha(ch)) {
          this.tokenizeIdentifierOrKeyword();
        } else if (this.isDigit(ch)) {
          this.tokenizeNumber();
        } else if (ch === '"') {
          this.tokenizeString();
        } else {
          this.tokenizeSymbol();
        }
      }
      return this.tokens;
    }
  
    skipWhitespace() {
      while (!this.isAtEnd() && /\s/.test(this.peek())) {
        this.advance();
      }
    }
  
    isAlpha(ch) {
      return /[a-zA-Z]/.test(ch);
    }
  
    isDigit(ch) {
      return /[0-9]/.test(ch);
    }
  
    isAlphaNumeric(ch) {
      return /[a-zA-Z0-9]/.test(ch);
    }
  
    tokenizeIdentifierOrKeyword() {
      let start = this.position;
      while (!this.isAtEnd() && this.isAlphaNumeric(this.peek())) {
        this.advance();
      }
      const text = this.input.substring(start, this.position);
      const keywords = new Set([
        "let",
        "if",
        "else",
        "resolve",
        "possible",
        "getOxidixngs",
        "getReducings",
        "show",
        "getMolecWeight",
        "getVolume",
        "getV",
        "isAcid",
        "isBase"
      ]);
      if (keywords.has(text)) {
        this.tokens.push({ type: "KEYWORD_TOKEN", value: text });
      } else {
        this.tokens.push({ type: "IDENTIFIER_TOKEN", value: text });
      }
    }
  
    tokenizeNumber() {
      let start = this.position;
      while (!this.isAtEnd() && this.isDigit(this.peek())) {
        this.advance();
      }
      const text = this.input.substring(start, this.position);
      this.tokens.push({ type: "NUMBER_TOKEN", value: text });
    }
  
    tokenizeString() {
      this.advance(); // skip the opening "
      let start = this.position;
      while (!this.isAtEnd() && this.peek() !== '"') {
        if (this.peek() === '\\') {
          this.advance();
        }
        this.advance();
      }
      if (this.isAtEnd()) {
        throw new Error("Unterminated string literal");
      }
      const value = this.input.substring(start, this.position);
      this.advance(); // skip the closing "
      this.tokens.push({ type: "STRING_TOKEN", value });
    }
  
    tokenizeSymbol() {   // Tokenize symbols such as operators and punctuation
      const ch = this.advance();
      // Check for multi-character operators (>=, <=)
      if ((ch === '>' || ch === '<' || ch === '=') && this.peek() === '=') {
        const op = ch + this.advance();
        this.tokens.push({ type: "OPERATOR_TOKEN", value: op });
        return;
      }
  
      switch (ch) {
        case '+':
        case '>':
        case '<':
        case '=':
          this.tokens.push({ type: "OPERATOR_TOKEN", value: ch });
          break;
        case '(':
        case ')':
        case '{':
        case '}':
        case ';':
        case ',':
          this.tokens.push({ type: "PUNCTUATION_TOKEN", value: ch });
          break;
        default:
          throw new Error("Unexpected character: " + ch);
      }
    }
  }
  

/*
let variable = "C6H6";
variable = "C6H6" + " + extra";
if (possible("C6H6" + variable)) {
  let reaction = resolve("C6H6" + variable);
  if (getOxidixngs(reaction)) {
    let oxidizers = getReducings(reaction);
    if (getMolecWeight(oxidizers) > 50) {
      let volume = getVolume(oxidizers);
      if (getV(volume, getMolecWeight(reaction)) < 100) {
        show("Reaction is stable with low volume");
      }
    }
  }
} else {
  show("Reaction is not possible");
}
*/

```

## Conclusions / Screenshots / Results  

### **Conclusions**  
The implemented **Lexer** successfully tokenizes an input string by identifying different elements such as **keywords, identifiers, numbers, strings, operators, and punctuation**. It follows a structured approach to scan, classify, and generate a token list that can be used for further processing in a parser or interpreter. The implementation includes **robust character navigation, whitespace handling, and error detection** for unexpected characters and unterminated strings.  

This approach ensures that expressions like **chemical reactions, mathematical equations, and programming-like syntax** can be effectively parsed for analysis or execution.  

### **Screenshots / Results**  
Below is an example of tokenized output from the lexer when processing the given sample code:

#### **Input Code Sample:**
```js
let variable = "C6H6";
if (possible("C6H6" + variable)) {
  let reaction = resolve("C6H6" + variable);
}
```
#### **Generated Tokens:**
```json
[
  { "type": "KEYWORD_TOKEN", "value": "let" },
  { "type": "IDENTIFIER_TOKEN", "value": "variable" },
  { "type": "OPERATOR_TOKEN", "value": "=" },
  { "type": "STRING_TOKEN", "value": "C6H6" },
  { "type": "PUNCTUATION_TOKEN", "value": ";" },
  { "type": "KEYWORD_TOKEN", "value": "if" },
  { "type": "PUNCTUATION_TOKEN", "value": "(" },
  { "type": "KEYWORD_TOKEN", "value": "possible" },
  { "type": "PUNCTUATION_TOKEN", "value": "(" },
  { "type": "STRING_TOKEN", "value": "C6H6" },
  { "type": "OPERATOR_TOKEN", "value": "+" },
  { "type": "IDENTIFIER_TOKEN", "value": "variable" },
  { "type": "PUNCTUATION_TOKEN", "value": ")" },
  { "type": "PUNCTUATION_TOKEN", "value": ")" },
  { "type": "PUNCTUATION_TOKEN", "value": "{" },
  { "type": "KEYWORD_TOKEN", "value": "let" },
  { "type": "IDENTIFIER_TOKEN", "value": "reaction" },
  { "type": "OPERATOR_TOKEN", "value": "=" },
  { "type": "KEYWORD_TOKEN", "value": "resolve" },
  { "type": "PUNCTUATION_TOKEN", "value": "(" },
  { "type": "STRING_TOKEN", "value": "C6H6" },
  { "type": "OPERATOR_TOKEN", "value": "+" },
  { "type": "IDENTIFIER_TOKEN", "value": "variable" },
  { "type": "PUNCTUATION_TOKEN", "value": ")" },
  { "type": "PUNCTUATION_TOKEN", "value": ";" },
  { "type": "PUNCTUATION_TOKEN", "value": "}" }
]
```
This output demonstrates that the **Lexer** correctly identifies and categorizes different elements, making it a reliable preprocessing step for any parsing-based system.


## References
- [Wikipedia](https://en.wikipedia.org/wiki/Lexical_analysis)
- [A sample of lexical analyzer](https://llvm.org/docs/tutorial/MyFirstLanguageFrontend/LangImpl01.html)
