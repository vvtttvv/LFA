// export default function lab4(n) {
//     let arr = [];

//     let result = document.getElementById("lab4_console");

//     function generatePattern1() {
//         let first = Math.random() < 0.5 ? "a" : "b";
//         let second = Math.random() < 0.5 ? "c" : "d";
//         let E_repeat = "E".repeat(Math.floor(Math.random() * 5) + 1); 
//         let G = "G"; 
         
        
//         result.innerHTML += "<br>Step 1 Generation:<br>";
//         result.innerHTML += `Step 1: Choose between 'a' and 'b' -> ${first}<br>`;
//         result.innerHTML += `Step 2: Choose between 'c' and 'd' -> ${second}<br>`;
//         result.innerHTML += `Step 3: Repeat 'E' a random number of times -> ${E_repeat}<br>`;
//         result.innerHTML += `Step 4: Add 'G' at the end -> ${G}<br>`;


//         return first + second + E_repeat + G;
//     }

//     function generatePattern2() {
//         let middle = ["Q", "R", "S"][Math.floor(Math.random() * 3)];
//         let uvw = (Math.random() < 0.33 ? "UV" : Math.random() < 0.5 ? "W" : "X").repeat(Math.floor(Math.random() * 6)); 
//         let zRepeat = "Z".repeat(Math.floor(Math.random() * 5) + 1);

//         result.innerHTML += "<br>Step 2 Generation:<br>";
//         result.innerHTML += `Step 1: Choose middle character between 'Q', 'R', or 'S' -> ${middle}<br>`;
//         result.innerHTML += `Step 2: Randomly generate UV, W, or X, and repeat a random number of times -> ${uvw}<br>`;
//         result.innerHTML += `Step 3: Repeat 'Z' a random number of times -> ${zRepeat}<br>`;
        
//         return `P${middle}T${uvw}${zRepeat}`;
//     }

//     function generatePattern3() {
//         let binaryPart = (Math.random() < 0.5 ? "0" : "1").repeat(Math.floor(Math.random() * 6)); 
//         let repeat34 = (Math.random() < 0.5 ? "3" : "4").repeat(5);
         
//         result.innerHTML += "<br>Step 3 Generation:<br>";
//         result.innerHTML += `Step 1: Generate binary part of '0' or '1' repeated -> ${binaryPart}<br>`;
//         result.innerHTML += `Step 2: Repeat '3' or '4' five times -> ${repeat34}<br>`;
        
//         return `1${binaryPart}2${repeat34}36`;
//     }

//     for (let i = 0; i < n; i++) {
//         console.log(`Generating sequence ${i + 1}:`);
//         let result = `${generatePattern1()} ${generatePattern2()} ${generatePattern3()}`;
//         arr.push(result);
//         console.log(`Generated result: ${result}\n`);
//     }

//     return arr;
// }


class SimpleRegexGenerator {
    constructor(pattern) {
        this.pattern = pattern;
        this.explanation = [];
    }

    addExplanation(part, explanation) {
        this.explanation.push(`Processing '${part}': ${explanation}`);
    }

    parsePattern() {
        let parts = [];
        let i = 0;

        while (i < this.pattern.length) {
            if (this.pattern[i] === '(') {
                let end = this.pattern.indexOf(')', i);
                if (end === -1) throw new Error("Unmatched parenthesis");
                let group = this.pattern.slice(i + 1, end).split('|');
                parts.push(group);
                this.addExplanation(this.pattern.slice(i, end + 1), `Either of ${group.join(" or ")} appears exactly once`);
                i = end + 1;
            } else if (this.pattern[i] === '{') {
                let end = this.pattern.indexOf('}', i);
                if (end === -1) throw new Error("Unmatched curly brace");
                let repeat = parseInt(this.pattern.slice(i + 1, end));
                if (parts.length > 0) {
                    let lastPart = parts.pop();
                    parts.push(lastPart.map(c => c.repeat(repeat)));
                }
                this.addExplanation(this.pattern.slice(i, end + 1), `Previous character appears exactly ${repeat} times`);
                i = end + 1;
            } else if (i + 1 < this.pattern.length && this.pattern[i + 1] === '*') { 
                let repeatCount = Math.floor(Math.random() * 6);  
                parts.push([this.pattern[i].repeat(repeatCount)]);
                this.addExplanation(this.pattern.slice(i, i + 2), `'${this.pattern[i]}' appears zero or more times`);
                i += 2; 
            } else if (i + 1 < this.pattern.length && ['?', '+'].includes(this.pattern[i + 1])) {
                if (this.pattern[i + 1] === '?') {
                    parts.push([this.pattern[i], '']);
                    this.addExplanation(this.pattern.slice(i, i + 2), `'${this.pattern[i]}' is optional`);
                } else if (this.pattern[i + 1] === '+') {
                    let repeatCount = Math.floor(Math.random() * 5) + 1; // Random 1-5 times
                    parts.push([this.pattern[i].repeat(repeatCount)]);
                    this.addExplanation(this.pattern.slice(i, i + 2), `'${this.pattern[i]}' appears one or more times`);
                }
                i += 2;
            } else {
                parts.push([this.pattern[i]]);
                this.addExplanation(this.pattern[i], `'${this.pattern[i]}' appears exactly once`);
                i += 1;
            }
        } 
        return parts;
    }

    explainProcess() {
        console.log(`\nExplanation for Processing of Pattern ${this.pattern}:`);
        this.explanation.forEach(step => console.log(step));
        console.log("\n");
    }

    generateRandomString(parts) {
        let resultString = parts.map(group => group[Math.floor(Math.random() * group.length)]).join('');
 
        resultString = resultString.replace(/\*/g, '');

        return resultString;
    }

    generateMultipleStrings(count) {
        let parts = this.parsePattern();
        return Array.from({ length: count }, () => this.generateRandomString(parts));
    }
}
 
const pattern = '1(0|1)*2(3|4){5}36';
const generator = new SimpleRegexGenerator(pattern);
 
const generatedStrings = generator.generateMultipleStrings(5);
 
let output = document.getElementById("lab4_console");
output.innerHTML = generator.explanation.join("<br>");
output.innerHTML += "<br><br>Generated strings:<br>";



export { generatedStrings };
