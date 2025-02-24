import { FiniteAutomaton } from "./FiniteAutomaton.js";

class Grammar {
    constructor(nonTerminals, terminals, productions, startSymbol, finalStates) {
        this.nonTerminals = new Set(nonTerminals);
        this.terminals = new Set(terminals);
        this.productions = productions;
        this.startSymbol = startSymbol;
        this.finalStates = finalStates;
    }

    generatateStrings(){
        let arr = [];
        for(let i = 0; i < 5; i++){
            arr.push(this.expandSymbol(this.startSymbol));
        }
        return arr;
    }
    
    expandSymbol(symbol) {
        if (this.terminals.has(symbol))  return symbol;   //It means we already have terminal 

        const rules = this.productions[symbol]; //Initially it always will be 'S': 'bA' => ['ba']
        if (!rules || rules.length === 0) return ''; //It means we don't have any rules
        const randomRule = rules[Math.floor(Math.random() * rules.length)]; //randomRule will be a string (initially 'ba')

        return randomRule.split('').map(s => this.expandSymbol(s)).join(''); //For non-teminals we will call function recursively
    }

    toFiniteAutomaton() {
        let q = new Set([...this.nonTerminals, "F"]);
        let sigma = new Set([...this.terminals]);
        let transitions = {};

        q.forEach(state => (transitions[state] = {})); // to create an object with the structure: {A: {}, B: {}, C: {}...}

        for (let [left, rules] of Object.entries(this.productions)) {   // To get key(Non-terminal)/values(rules)
            for (let rule of rules) {
                let symbol, nextState;
                
                if (rule.length === 2) {
                    [symbol, nextState] = rule.split("");
                } else {
                    [symbol, nextState] = [rule, 'F'];
                    transitions['F'][rule] = [];
                }
                
        
                let leftStates = left.split("");
        
                if (leftStates.length > 1) {
                    if (!transitions[leftStates[0]]) transitions[leftStates[0]] = {};
                    if (!transitions[leftStates[0]][leftStates[1]]) transitions[leftStates[0]][leftStates[1]] = [];
        
                    transitions[leftStates[0]][leftStates[1]].push(nextState);
                } else {
                    if (transitions[left][symbol]) {
                        transitions[left][symbol].push(nextState);
                    } else {
                        transitions[left][symbol] = [nextState];
                    }
                }
            }
        }
        
        // console.log(transitions);
        return new FiniteAutomaton(q, sigma, transitions, this.startSymbol, this.finalStates);
    }

    classifyGrammar() {
        let type1, type3, type2, type0;
        type1 = type3 = type2 = type0 = true;
        for(let left in this.productions){
            if(left.length > 1){
                type3 = false; //For structure like aAB -> a
                type2 = false; //For structure like AB -> a
            }
            let startedWithNonTerminal = false, endedWithNonTerminal = false;
            for(let right of this.productions[left]){
                // If the production is non-empty and the right side is shorter than the left side, it's invalid.
                if (right !== '' && right.length < left.length) {
                    type1 = false;
                    console.log("Type 1 violation (shortened production): " + left + " -> " + right);
                }
                // If an empty production is found, it is only allowed for the start symbol (if defined).
                if (right === '' && left !== this.startSymbol) {
                    type1 = false;
                    console.log("Empty production is only allowed for the start symbol: " + left + " -> " + right);
                }

                let startsWithNonTerminal = this.nonTerminals.has(right[0]);
                let endsWithNonTerminal = this.nonTerminals.has(right[right.length-1]);
                const nonTerminalCount = [...right].filter(symbol => this.nonTerminals.has(symbol)).length;
                if(right === ''){
                    continue;
                };
                if(right.length === 1){
                    if(!this.terminals.has(right)){
                        type3 = false;    //For structure like A -> B
                        console.log("Vn -> Vn");
                    } 
                } else if(!((startsWithNonTerminal || endsWithNonTerminal) && nonTerminalCount === 1)){
                    type3 = false;     //For structure like A -> aBa or A -> BaB
                    console.log("Vn -> VnVn");
                }
                if(startsWithNonTerminal){
                    startedWithNonTerminal = true;
                } else if(endsWithNonTerminal){
                    endedWithNonTerminal = true;
                }
                if(startedWithNonTerminal && endedWithNonTerminal){
                    type3 = false;              // For situations when A -> aB and A -> Ba
                    console.log("Vn -> VnVt/VtVn");
                }
            }
        }

        console.log("Type 3: " + type3 + ", Type 2: " + type2 + ", Type 1: " + type1 + ", Type 0: " + type0);
        switch(true){
            case type3:
                return "Type 3";
            case type2:
                return "Type 2";
            case type1:
                return "Type 1";
            default:
                return "Type 0";
        }
    }
}


export {Grammar}