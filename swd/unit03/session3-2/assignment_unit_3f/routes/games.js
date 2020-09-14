var express = require('express')
var games = express.Router();

const promiseWrappers = require('./../promise-wrappers');

const gameFilesFolderName = 'game_files';


games.get('/listPlayerFiles', async (req, res) => {
    const directory = await promiseWrappers.readdirP(`./`+gameFilesFolderName);
    res.json(directory);
})

games.post('/createPlayerFile', async (req, res) => {
    try {
        const fileLocation = gameFilesFolderName + `/${req.body.name}.json`;
        const newFile = await promiseWrappers.createEmptyFileP(fileLocation);
        await promiseWrappers.writeFileP(fileLocation, JSON.stringify(req.body));
        res.send(req.body)
    } catch (error) {
        error = "Er is iets fout gegaan bij het aanmaken van de speler.";
        res.json(error);
    }
});

games.delete('/deletePlayerFile/:player', async (req, res) => {
    const message = {
        "result": `Game ${req.params.player}.json removed`
    }
    try {
        await promiseWrappers.unlinkFileP(gameFilesFolderName + `/${req.params.player}.json`);
        res.json(message);
    } catch (error) {
        res.json(error);
    }
})

module.exports = games;