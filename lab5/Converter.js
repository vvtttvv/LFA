export default class NFAtoDFAConverter {
    constructor(nfa) {
        this.nfa = nfa;
        this.alphabet = [...nfa.alphabet]; 
        this.states = [];
        this.transitions = {};
        this.finalStates = new Set();
        this.convert();
        this.initialState = nfa.initialState;
    }

    convert() {
        const initialDFAState = this.epsilonClosure(new Set([this.nfa.initialState]));
        this.states.push(initialDFAState);
        let unprocessedStates = [initialDFAState];

        while (unprocessedStates.length > 0) {
            const currentState = unprocessedStates.pop();
            const stateKey = this.stateToString(currentState);
            this.transitions[stateKey] = {};

            for (let symbol of this.alphabet) {
                const nextState = this.epsilonClosure(this.move(currentState, symbol));
                if (nextState.size > 0) {
                    const nextStateKey = this.stateToString(nextState);
                    if (!this.states.some(s => this.stateToString(s) === nextStateKey)) {
                        this.states.push(nextState);
                        unprocessedStates.push(nextState);
                    }
            
                    if (!this.transitions[stateKey][symbol]) {
                        this.transitions[stateKey][symbol] = [];
                    }
                    this.transitions[stateKey][symbol].push(nextStateKey);
                }
            }
            

            if ([...currentState].some(state => this.nfa.finalStates.has(state))) {
                this.finalStates.add(stateKey);
            }
        }
    }

    epsilonClosure(states) {
        return new Set(states); 
    }

    move(states, symbol) {
        let result = new Set();
        for (let state of states) {
            if (this.nfa.transitions[state] && this.nfa.transitions[state][symbol]) {
                this.nfa.transitions[state][symbol].forEach(s => result.add(s));
            }
        }
        return result;
    }

    stateToString(stateSet) {
        return [...stateSet].sort().join(',');
    }
}
