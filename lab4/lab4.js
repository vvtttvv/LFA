export default function lab4(n) {
    let arr = [];

    let result = document.getElementById("lab4_console");

    function generatePattern1() {
        let first = Math.random() < 0.5 ? "a" : "b";
        let second = Math.random() < 0.5 ? "c" : "d";
        let E_repeat = "E".repeat(Math.floor(Math.random() * 5) + 1); 
        let G = "G"; 
         
        
        result.innerHTML += "<br>Step 1 Generation:<br>";
        result.innerHTML += `Step 1: Choose between 'a' and 'b' -> ${first}<br>`;
        result.innerHTML += `Step 2: Choose between 'c' and 'd' -> ${second}<br>`;
        result.innerHTML += `Step 3: Repeat 'E' a random number of times -> ${E_repeat}<br>`;
        result.innerHTML += `Step 4: Add 'G' at the end -> ${G}<br>`;



        return first + second + E_repeat + G;
    }

    function generatePattern2() {
        let middle = ["Q", "R", "S"][Math.floor(Math.random() * 3)];
        let uvw = (Math.random() < 0.33 ? "UV" : Math.random() < 0.5 ? "W" : "X").repeat(Math.floor(Math.random() * 6)); 
        let zRepeat = "Z".repeat(Math.floor(Math.random() * 5) + 1);

        result.innerHTML += "<br>Step 2 Generation:<br>";
        result.innerHTML += `Step 1: Choose middle character between 'Q', 'R', or 'S' -> ${middle}<br>`;
        result.innerHTML += `Step 2: Randomly generate UV, W, or X, and repeat a random number of times -> ${uvw}<br>`;
        result.innerHTML += `Step 3: Repeat 'Z' a random number of times -> ${zRepeat}<br>`;
        
        return `P${middle}T${uvw}${zRepeat}`;
    }

    function generatePattern3() {
        let binaryPart = (Math.random() < 0.5 ? "0" : "1").repeat(Math.floor(Math.random() * 6)); 
        let repeat34 = (Math.random() < 0.5 ? "3" : "4").repeat(5);
         
        result.innerHTML += "<br>Step 3 Generation:<br>";
        result.innerHTML += `Step 1: Generate binary part of '0' or '1' repeated -> ${binaryPart}<br>`;
        result.innerHTML += `Step 2: Repeat '3' or '4' five times -> ${repeat34}<br>`;
        
        return `1${binaryPart}2${repeat34}36`;
    }

    for (let i = 0; i < n; i++) {
        console.log(`Generating sequence ${i + 1}:`);
        let result = `${generatePattern1()} ${generatePattern2()} ${generatePattern3()}`;
        arr.push(result);
        console.log(`Generated result: ${result}\n`);
    }

    return arr;
}
