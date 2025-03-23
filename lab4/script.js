import { FiniteAutomaton } from "./FiniteAutomaton.js";
import { Grammar } from "./Grammar.js"; 
import drawAutomaton from "./draw.js";
import NFAtoDFAConverter from "./Converter.js";
import drawAutomaton2 from "./drawDFA.js";
import Lexer from "./lexer.js";
import lab4 from "./lab4.js";

const nonTerminals = ["S", "A", "B", "C"];
const terminals = ["a", "b", "c"];   // In my variant it is without 'c', but I suppose it is misspell
const productions = {
    "S": ["bA"],                         
    "AB": ["b", "aB", "bA"],     
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


//------------------------------------------------------------------------
//Helper part of code for textarea field
document.getElementById("code-editor").addEventListener("keydown", function(e) {
    if (e.key === "Tab") {
        e.preventDefault(); 
        let start = this.selectionStart;
        let end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
    }
});
//------------------------------------------------------------------------

//------------------------------------------------------------------------
//Lexer

const startTokenization = document.getElementById("startLexicalAnalysis");
startTokenization.onclick = function() {
    const inputedValue = document.getElementById("code-editor").value;
    const lexer = new Lexer(inputedValue);
    const tokens = lexer.tokenize();
    console.log(tokens);

    const tokensContainer = document.getElementById("tokens");
    tokensContainer.innerHTML = ""; 

    tokens.forEach(token => {
        const tokenElement = document.createElement("div");
        tokenElement.textContent = JSON.stringify(token);
        tokensContainer.appendChild(tokenElement);
    });
};



// Lab 4
lab4(10).map((string)=>{
    let newText = document.createElement('p');
    console.log("Worked");
    newText.textContent = `Created string: ${string}`;   
    const divElement = document.getElementById("lab4_library");
    divElement.appendChild(newText); 
})