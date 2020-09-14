'use strict';

const express = require('express');
const Game = require('./game.js');
const promiseWrappers = require('./promise-wrappers');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const gameFilesFolderName = 'game_files';

app.use(bodyParser.json());

app.get('/action/:player/where', async (req, res) => {
    const fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
    const fileContent = await promiseWrappers.readFileP(fileName);
    
    const gameState = JSON.parse(fileContent);
    const game = new Game(gameState);
    
    const locationInformation = await game.getLocationInformation();
    res.json(locationInformation);
});


app.post('/action/:player/goto', async (req, res) => {
   //Paste your implementation from assignment unit 3b here
   const fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
   const fileContent = await promiseWrappers.readFileP(fileName);
   const parseFile = JSON.parse(fileContent);
   const game = new Game(parseFile);
   await game.goToLocation(req.query.location);
   const getPlayerInfo = await game.state;
   await promiseWrappers.writeFileP(fileName, JSON.stringify(getPlayerInfo));
   res.send(getPlayerInfo);
   console.log(getPlayerInfo.map);
});

app.post('/action/:player/arise', async (req, res) => {
    const fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
    const fileContent = await promiseWrappers.readFileP(fileName);
    const parseFile = JSON.parse(fileContent);
    const game = new Game(parseFile);
    const playerNewStart = await game.startNew(req.body.start, req.body.inventory);
    const getPlayerInfo = await game.state;
    res.send(playerNewStart);
});

const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});