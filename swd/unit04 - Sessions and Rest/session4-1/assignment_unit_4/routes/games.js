const express = require('express')
const games = express.Router();
const Game = require('./../game.js');

const promiseWrappers = require('./../promise-wrappers');

const gameFilesFolderName = 'game_files';


games.get('/playerfile', async (req, res) => {
    const directory = await promiseWrappers.readdirP(`./`+gameFilesFolderName);
    res.json(directory);
})

games.post('/playerfile', async (req, res) => {
    try {
        const fileLocation = gameFilesFolderName + `/${req.body.name}.json`;
        await promiseWrappers.createEmptyFileP(fileLocation);
        await promiseWrappers.writeFileP(fileLocation, JSON.stringify(req.body));
        res.send(req.body)
    } catch (error) {
        error = "Er is iets fout gegaan bij het aanmaken van de speler.";
        res.json(error);
    }
});

games.delete('/playerfile/:player', async (req, res) => {
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