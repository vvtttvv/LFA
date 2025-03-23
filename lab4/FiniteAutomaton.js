import { Grammar } from './Grammar.js';

class FiniteAutomaton {
    constructor(states, alphabet, transitions, initialState, finalStates) {
        this.states = new Set(states);
        this.alphabet = new Set(alphabet); 
        this.transitions = transitions;
        this.initialState = initialState;
        this.finalStates = new Set(finalStates);
    }

    stringBelongToLanguage(inputString) {
        let currentState = this.initialState;
        for (let i = 0; i < inputString.length; i++) {
            let char = inputString[i];
            if (!this.alphabet.has(char)) return false; // An unknown word like "fgsfgdfs" or "Dfadfs", we should have only combinations of abc
            let stateTransitions = this.transitions[currentState] || {}; // like {b: 'A', a: 'B'}
            if (!(char in stateTransitions)) return false;// If we don't have needed char (e.g. {b: 'A', a: 'B'} we need to have 'a' or 'b')
            if(stateTransitions[char].length!==1){
                if(i===inputString.length-1){
                    currentState = 'F';
                } else{
                    currentState = stateTransitions[char][1];
                }
            } else{
                currentState = stateTransitions[char][0];
            }
            // console.log(currentState);
            // console.log(stateTransitions);
            // console.log(this.transitions);
        }

        return this.finalStates.has(currentState);
    }

    toGrammar() {
        let nonTerminals = new Set(this.states);
        let terminals = new Set(this.alphabet);
        let productions = {};

        for (let state of this.states) {
            productions[state] = [];
            for (let symbol of this.alphabet) {
                let nextStates = this.transitions[state] && this.transitions[state][symbol];
                if (nextStates) {
                    for (let nextState of nextStates) {
                        productions[state].push(symbol + nextState);
                        if(this.finalStates.has(nextState)){
                            productions[state].push(symbol);
                        }
                    }
                }
            }
        }
        return new Grammar(nonTerminals, terminals, productions, this.initialState, this.finalStates);
    }

    isDeterministic() {
        for (let state of this.states) {
            for (let symbol of this.alphabet) {
                if(this.transitions[state][symbol]){
                    let count = 0;
                    for(let i = 0; i < this.transitions[state][symbol].length; i++){
                        if(!this.finalStates.has(this.transitions[state][symbol][i])){
                            count++;
                        }
                    }       
                    if (count > 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    
}


export { FiniteAutomaton }