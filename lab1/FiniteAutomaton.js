class FiniteAutomaton {
    constructor(states, alphabet, transitions, initialState, finalStates) {
        this.states = new Set(states);
        this.alphabet = new Set(alphabet); 
        this.transitions = transitions;
        this.initialState = initialState;
        this.finalStates = finalStates;
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
}


export { FiniteAutomaton }