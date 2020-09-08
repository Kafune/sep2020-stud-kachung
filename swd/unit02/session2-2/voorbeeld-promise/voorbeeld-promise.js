const http = require("http");
const fetch = require("node-fetch");

function retrieveAsciiArt(word) {
    const url = "http://artii.herokuapp.com/make?" + word;
    return fetch(url).then((response) => {
        return response.text();
    })

} 

function retrieveQuote() {
    const url = "http://quotes.stormconsultancy.co.uk/random.json";
    //return promise object, waarmee je een promise erbuiten kan chainen
    return fetch(url).then((response) => {
        return response.json();
    })
}

let quotePromise = retrieveQuote()
quotePromise.then((quoteObject) => {
    console.log(quoteObject.quote)
    let author = quoteObject.author 
    let art = retrieveAsciiArt(author)
    //return nieuwe promise, en chain deze eronder
    return retrieveAsciiArt(author)
}).then((asciiString) => {
    //bij de laatste promise niet nodig om een return waarde mee te geven.
    console.log(asciiString);
}).catch((error) => {
    console.log(error);
})
