const fs = require('fs');

//Promise-based interface definitie
function readFileP(file) {
    return new Promise((resolve, reject) => {
        fs.readFile('', (error, data) {
            if(error) {
                throw error;
                reject();
            }

            console.log(data);
            resolve();
        })
    });
}

//Gebruik van de functie
readFileP('test.txt').then(value => {
    console.log(value.toString());
});