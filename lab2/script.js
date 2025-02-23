import { FiniteAutomaton } from "./FiniteAutomaton.js";
import { Grammar } from "./Grammar.js"; 
import drawAutomaton from "./draw.js";
import NFAtoDFAConverter from "./Converter.js";
import drawAutomaton2 from "./drawDFA.js";

const nonTerminals = ["S", "A", "B", "C"];
const terminals = ["a", "b", "c"];   // In my variant it is without 'c', but I suppose it is misspell
const productions = {
    "S": ["bA"],                         
    "A": ["b", "aB", "bA"],     
    "B": ["bC", "aB"],
    "C": ["cA"], 
};
const startSymbol = "S";

const grammar = new Grammar(nonTerminals, terminals, productions, startSymbol, new Set(['F', '']));
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


input.placeholder = "Grammar : " + grammar.classifyGrammar();

/*
Variant 29
Q = {q0,q1,q2},
∑ = {a,b},
F = {q2},
δ(q0,a) = q1,
δ(q0,a) = q0,
δ(q1,b) = q1,
δ(q1,a) = q2,
δ(q2,b) = q2,
δ(q2,a) = q0.
*/

let Q = ["A", "B", "C"];
let sigma = ["a", "b"];
let F = ["C"];
let delta = {
    "A": { "a": ["B", "A"] },
    "B": { "b": ["B"], "a": ["C"] },
    "C": { "b": ["C"], "a": ["A"] }
};

let ndfa = new FiniteAutomaton(Q, sigma, delta, "A", F);
console.log(ndfa);
let dfa = new NFAtoDFAConverter(ndfa);
console.log(dfa);


drawAutomaton(ndfa, "nfaCanvas");
drawAutomaton2(dfa, "dfaCanvas");
