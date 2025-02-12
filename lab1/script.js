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