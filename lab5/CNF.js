const EPSILON = "ε";

export default class CNF {
    constructor(nonTerminals, terminals, rules, start = 'S') {
        this.nonTerminals = nonTerminals;
        this.terminals = terminals;
        this.rules = rules;
        this.start = start;
    }

    printRules() {
        for (const nonTerminal in this.rules) {
            console.log(`${nonTerminal} -> ${this.rules[nonTerminal].join(' | ')}`);
        }
    }

    isCNF() {
        for (const nonTerminal in this.rules) {
            for (const production of this.rules[nonTerminal]) {
                if (production.length === 0 || production.length > 2) {
                    return false;
                }
                if (production.length === 1 && !this.terminals.includes(production)) {
                    return false;
                }
                if (production.length === 2 && production.split('').some(symbol => this.terminals.includes(symbol))) {
                    return false;
                }
            }
        }
        return true;
    }
    

    eliminateEpsilonProductions() {
        let nullable = new Set();
    
        for (const nonTerminal of this.nonTerminals) {
            if (!this.rules[nonTerminal]) continue; 
            for (const production of this.rules[nonTerminal]) {
                if (production === EPSILON) {
                    nullable.add(nonTerminal);
                }
            }
        }
    
        let changes = true;
        while (changes) {
            changes = false;
            for (const nonTerminal of this.nonTerminals) {
                if (!this.rules[nonTerminal]) continue;
                if (!nullable.has(nonTerminal)) {
                    for (const production of this.rules[nonTerminal]) {
                        if ([...production].every(symbol => nullable.has(symbol))) {
                            nullable.add(nonTerminal);
                            changes = true;
                            break;
                        }
                    }
                }
            }
        }
    
        let newRules = {};
        for (const nonTerminal in this.rules) {
            let newProds = [];
            for (const production of this.rules[nonTerminal]) {
                if (production !== EPSILON) {
                    newProds.push(...this._expandNullableProd(production, nullable));
                }
            }
            newRules[nonTerminal] = [...new Set(newProds)];
        }
        this.rules = newRules;
    }
    

    _expandNullableProd(production, nullable) {
        let expansions = [''];
        for (const symbol of production) {
            let newExpansions = [];
            if (nullable.has(symbol)) {
                for (const expansion of expansions) {
                    newExpansions.push(expansion + symbol);
                    newExpansions.push(expansion);
                }
            } else {
                for (const expansion of expansions) {
                    newExpansions.push(expansion + symbol);
                }
            }
            expansions = newExpansions;
        }
        return expansions.filter(exp => exp !== '');
    }

    eliminateRenaming() {
        let changes = true;
        while (changes) {
            changes = false;
            for (const nonTerminal of this.nonTerminals) {
                if (!this.rules[nonTerminal]) continue; 
                let unitProductions = this.rules[nonTerminal].filter(p => this.nonTerminals.includes(p));
                for (const unit of unitProductions) {
                    if (!this.rules[unit]) continue; 
                    let newProductions = this.rules[unit];
                    if (newProductions) {
                        this.rules[nonTerminal].push(...newProductions); 
                        this.rules[nonTerminal] = this.rules[nonTerminal].filter(p => p !== unit); 
                        this.rules[nonTerminal] = [...new Set(this.rules[nonTerminal])];
                        changes = true;
                    }
                }
            }
        }
    }
    

    eliminateInaccessibleSymbols() {
        let accessible = new Set([this.start]);
        let changes = true;
        while (changes) {
            changes = false;
            for (const nonTerminal of [...accessible]) {
                if (!this.rules[nonTerminal]) continue;  
                for (const production of this.rules[nonTerminal]) {
                    for (const symbol of production) {
                        if (this.nonTerminals.includes(symbol) && !accessible.has(symbol)) {
                            accessible.add(symbol);
                            changes = true;
                        }
                    }
                }
            }
        }
        this.nonTerminals = [...accessible];
        this.rules = Object.fromEntries(Object.entries(this.rules).filter(([nt]) => accessible.has(nt)));
    }
    

    eliminateNonProductiveSymbols() {
        let productive = new Set([this.start]);
        let changes = true;
        while (changes) {
            changes = false;
            for (const nonTerminal of this.nonTerminals) { 
                if (!this.rules[nonTerminal]) continue;
                if (!productive.has(nonTerminal)) {
                    for (const production of this.rules[nonTerminal]) { 
                        if ([...production].every(symbol => this.terminals.includes(symbol) || productive.has(symbol))) {
                            productive.add(nonTerminal);
                            changes = true;
                            break;
                        }
                    }
                }
            }
        }
        this.nonTerminals = [...productive];
        this.rules = Object.fromEntries(
            Object.entries(this.rules).filter(([nt]) => productive.has(nt))
        );
    }
    

    _createNewNonTerminal() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (const letter of alphabet) {
            if (!this.nonTerminals.includes(letter)) {
                this.nonTerminals.push(letter);
                return letter;
            }
        }
        throw new Error("No available non-terminal symbols.");
    }

    getCNFform() {
        let newRules = {};
        let terminalMap = {};
        
        for (const nonTerminal in this.rules) {
            newRules[nonTerminal] = [];
            for (const production of this.rules[nonTerminal]) {
                let newProduction = [];
                
                for (const symbol of production) {
                    if (this.terminals.includes(symbol)) {
                        if (!(symbol in terminalMap)) {
                            const newNonTerminal = this._createNewNonTerminal();
                            terminalMap[symbol] = newNonTerminal;
                            this.nonTerminals.push(newNonTerminal);
                            newRules[newNonTerminal] = [symbol];
                        }
                        newProduction.push(terminalMap[symbol]);
                    } else {
                        newProduction.push(symbol);
                    }
                }
                
                while (newProduction.length > 2) {
                    const first = newProduction.shift();
                    const second = newProduction.shift();
                    const newNonTerminal = this._createNewNonTerminal();
                    this.nonTerminals.push(newNonTerminal);
                    newRules[newNonTerminal] = [first + second];
                    newProduction.unshift(newNonTerminal);
                }
                
                newRules[nonTerminal].push(newProduction.join(''));
            }
        }
        
        this.rules = newRules;
    }


    toCNF(printSteps = true) {
        if (this.isCNF()) return;

        this.eliminateEpsilonProductions();
        if (printSteps) console.log("After eliminating epsilon productions:");
        this.printRules();

        this.eliminateRenaming();
        if (printSteps) console.log("After eliminating renaming productions:");
        this.printRules();

        this.eliminateInaccessibleSymbols();
        if (printSteps) console.log("After eliminating inaccessible symbols:");
        this.printRules();

        this.eliminateNonProductiveSymbols();
        if (printSteps) console.log("After eliminating non-productive symbols:");
        this.printRules();

        this.getCNFform();
        if (printSteps) console.log("After eliminating symbols != `Vt` or `VnVn`:");
        this.printRules();
    }
}
