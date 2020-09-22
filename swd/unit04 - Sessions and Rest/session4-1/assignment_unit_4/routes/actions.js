const express = require('express')
const actions = express.Router();
const Game = require('./../game.js');

const path = require('path');
const promiseWrappers = require('./../promise-wrappers');

const gameFilesFolderName = 'game_files';


const gameFileReader = async (req, res, next) => {
    //TODO D1, D2
    if (req.session.player) {
        try {
            req.fileName = path.join(gameFilesFolderName, `${req.session.player}.json`);
            req.fileContent = await promiseWrappers.readFileP(req.fileName);
            next();
        } catch (error) {
            error = new Error("Something went wrong with the request");
            next(error);
        }
    } else {
        next("Player is not logged in or does not exist");
    }
}

const gameStateReader = async (req, res, next) => {
    //TODO D3
    try {
        req.gameState = JSON.parse(req.fileContent);
        req.game = new Game(req.gameState);
        next();
    } catch (error) {
        error = new Error('Game does not exist!');
        next(error);
    }
}

actions.use('/', gameFileReader);
actions.use('/', gameStateReader);

actions.use((error, req, res, next) => {
    console.error(error);
    res.status(404);
    res.send(error);
})

actions.get('/location', async (req, res) => {
    const locationInformation = await req.game.getLocationInformation();
    console.log(req.game.getLocationInformation())

    res.json(locationInformation);
});


actions.post('/location', async (req, res) => {
    //Paste your implementation from assignment unit 3c here
    await req.game.goToLocation(req.query.location);
    const getPlayerInfo = await req.game.state;
    await promiseWrappers.writeFileP(req.fileName, JSON.stringify(getPlayerInfo));
    res.send(getPlayerInfo);
    console.log(getPlayerInfo.map);
});

actions.post('/player', async (req, res) => {
    //Paste your implementation from assignment unit 3c here
    const playerNewStart = await req.game.startNew(req.body.start, req.body.inventory);
    const getPlayerInfo = await req.game.state;
    res.send(playerNewStart);
});

module.exports = actions;