import { FiniteAutomaton } from "./FiniteAutomaton.js";

class Grammar {
    constructor(nonTerminals, terminals, productions, startSymbol) {
        this.nonTerminals = new Set(nonTerminals);
        this.terminals = new Set(terminals);
        this.productions = productions;
        this.startSymbol = startSymbol;
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
                if(rule.length === 2){
                    [symbol, nextState] = rule.split("");
                } else{
                    [symbol, nextState] = [rule, 'F'];
                    transitions['F'][rule] = {};
                }
                 console.log(left + "  " + rule + "  " + symbol + "  " + nextState);
                if(transitions[left][symbol]){
                    transitions[left][symbol].push(nextState);
                } else{
                    transitions[left][symbol] = [nextState]; // Finally we create next structure: {A:{a:'B',b:['A','F']},B:{..},C:{..}...}
                }
                // console.log(transitions);
            }
        }
         console.log(transitions);
        return new FiniteAutomaton(q, sigma, transitions, this.startSymbol, new Set(['F']));
    }
}


export {Grammar}