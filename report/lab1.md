# Regular Grammars

### Course: Formal Languages & Finite Automata
### Author: Titerez Vladislav

----

## Theory
**Connection in LFA:**  
- **Finite automata** act as "checkers" to verify if a string belongs to a language.  
- **Grammars** act as "builders" to generate all valid strings in a language.
  
Together, they help study how languages (like programming or pattern rules) are structured and processed.

**Grammar (in LFA):**  
A set of rules to build valid strings in a language, like a recipe. For example, if you want to make a valid sentence, the rules might say: "A sentence can be a noun followed by a verb." Then "noun" could be "cat" or "dog," and "verb" could be "runs" or "sleeps." Starting with the rule, you replace parts until you get a valid string (e.g., "cat runs"). Grammars define *how* to create correct sentences, while automata *check* if a sentence follows the rules.
**Finite Automaton (FA):**  
Imagine a simple machine that reads an input (like a string of symbols) step by step. It has a few "states" (like moods) and switches between them based on the input. For example, think of a door with a security code: it starts "locked," and if you enter the correct digits (input), it moves to "unlocked." If it ends in the "unlocked" state, the input is accepted. If not, it’s rejected. It’s like a flowchart that says "yes" or "no" to a sequence of steps.
## Objectives:
Discover what a language is and what it needs to have in order to be considered a formal one;
Provide the initial setup for the evolving project that you will work on during this semester. You can deal with each laboratory work as a separate task or project to demonstrate your understanding of the given themes, but you also can deal with labs as stages of making your own big solution, your own project. Do the following:
a. Create GitHub repository to deal with storing and updating your project;

b. Choose a programming language. Pick one that will be easiest for dealing with your tasks, you need to learn how to solve the problem itself, not everything around the problem (like setting up the project, launching it correctly and etc.);

c. Store reports separately in a way to make verification of your work simpler (duh)

According to your variant number, get the grammar definition and do the following:

a. Implement a type/class for your grammar;

b. Add one function that would generate 5 valid strings from the language expressed by your given grammar;

c. Implement some functionality that would convert and object of type Grammar to one of type Finite Automaton;

d. For the Finite Automaton, please add a method that checks if an input string can be obtained via the state transition from it;

## Implementation description

You can "run" the programm just clicking to index.html. Grammar.js conatins implementation class of grammar.  FiniteAutomaton.js conatins implementation class of grammar finite automaton. Main part of code is located in script.js. Styles are added to make it more fancy.
If we talk about implementation, I tried to add comments in my solution (*please check files*). Key moments:
**Grammar**
- I have a constructor
- I implemented method which generates strings (5 strings), it calls helper method.
- Also I have method to convert grammar in finite automaton

**Finite Automaton**
- A construcor
- A method to check if a string belongs to language


```js
import { Grammar } from "./Grammar.js";

const nonTerminals = ["S", "A", "B", "C"];
const terminals = ["a", "b", "c"];   // In my variant it is without 'c', but I suppose it is misspell
const productions = {
    "S": ["bA"],
    "A": ["b", "aB", "bA"],
    "B": ["bC", "aB"],
    "C": ["cA"], 
};
const startSymbol = "S";

const grammar = new Grammar(nonTerminals, terminals, productions, startSymbol);
const finiteAutomaton = grammar.toFiniteAutomaton();

const strings = grammar.generatateStrings();
strings.map((string)=>{
    let newText = document.createElement('p');
    newText.textContent = `Created string: ${string}`;  
    Tests.prepend(newText);
})

const testStrings = ["babcb", "bba", "ba", "bbb", 'bb', "abc", 'something', 'babc'];
testStrings.forEach(str => {
    let newText = document.createElement('p');
    newText.textContent = `String "${str}" ${finiteAutomaton.stringBelongToLanguage(str) ? "belongs" : "doesn't belong"} to the language`;
    Generated.prepend(newText);
});


let valueForCheck = '';
input.onchange = function(){
    valueForCheck = input.value;
    let result = finiteAutomaton.stringBelongToLanguage(valueForCheck)
    let newText = document.createElement('p');
    let resultShow = document.getElementById('resultShow');
    newText.textContent = `This word ${result ? 'is in language' : "isn't in language"}`;
    resultShow.prepend(newText);
}
```
## Conclusions / Screenshots / Results
In conclusion, this lab gave me nice opportunity to practice classes in js (I didn't work with them for long time). Also due to 1 lab I improved my knowledge about grammar and finite automaton and sustained my knowledge with practical tasks. 
![image](https://github.com/user-attachments/assets/b2c0978f-42e7-4c19-bbc9-d5a8838d05ae)
*As we can see, results are good...*

## References
- https://github.com/filpatterson/DSL_laboratory_works/blob/master/1_RegularGrammars/task.md
- https://en.wikipedia.org/wiki/Finite-state_machine
