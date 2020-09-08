const http = require('http');
const fetch = require('node-fetch');

async function retrieveAsciiArt(word) {
    const url = '';
    //await zorgt ervoor dat de response meteen een promise wordt.
    let response = await fetch(url);
    let text = await response.text(); 
    
    return object;
}

async function retrieveQuote() {
    const url = '';
    let response = await fetch(url);
    let object = await response.json();
    return object;    
}

async function logAscii() {
    let quoteObject = await retrieveQuote();
    console.log(quoteObject.quote);
    let asciiString = await retrieveAsciiArt(quoteObject.author);
    console.log(asciiString);
}

try {
    logAscii();
} catch {
    console.log(error.message);
}

async function f() {
    return 1;
}

f().then(console.log);