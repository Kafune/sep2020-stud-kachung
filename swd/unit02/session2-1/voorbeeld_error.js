const fs = require('fs');
const { Z_VERSION_ERROR } = require('zlib');

// bepalen wanneer de callback aanroep gebeurt
const readJson = (filename, willekeurig) => {
fs.readFile('inhoud.json', 'utf-8', (error, data) => {
    if(error) {
        return error;
    }
        try {
    const result = JSON.parse(data)
    willekeurig(null, result);
    } catch (error) {
        willekeurig(error);
    }
});
}

//bepalen wat er in de callback gebeurt.
readJson('inhoud', (error, obj) => {
    if(error) {
        return error;
    }
    obj.staus = 'afgehandeld';
    console.log(obj);
})

readJson('inhoud', (error, data) => {
    if(error) {
        return error;
    }

    
});