'use strict';

const express = require('express');
const Game = require('./game.js');
const promiseWrappers = require('./promise-wrappers');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const gameFilesFolderName = 'game_files';

app.use(bodyParser.json());

const gameFileReader = async (req, res, next) => {
  //TODO D1, D2
  try {
    req.fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
    req.fileContent = await promiseWrappers.readFileP(req.fileName);
    next();
  } catch(error) {
    if(error) {
      res.status(404);
      res.json(error);
    } else {
      error = new Error('Player does not exist!');
      next(error);
    }
  }
}

const gameStateReader = async(req, res, next) => {
  //TODO D3
  try {
    req.gameState = JSON.parse(req.fileContent);
    req.game = new Game(req.gameState);
    next();
  } catch(error) {
    error = new Error('Game does not exist!');
    next(error);
  }
}

app.use('/action/:player/', gameFileReader);
app.use('/action/:player/', gameStateReader);

app.get('/listPlayerFiles', async(req, res) => {
  const directory = await promiseWrappers.readdirP(gameFilesFolderName);
  res.json(directory);
})

app.get('/action/:player/where', async (req, res) => {
    const locationInformation = await req.game.getLocationInformation();
    res.json(locationInformation);
});


app.post('/action/:player/goto', async (req, res) => {
   //Paste your implementation from assignment unit 3c here
   await req.game.goToLocation(req.query.location);
   const getPlayerInfo = await req.game.state;
   await promiseWrappers.writeFileP(req.fileName, JSON.stringify(getPlayerInfo));
   res.send(getPlayerInfo);
   console.log(getPlayerInfo.map);
});

app.post('/action/:player/arise', async (req, res) => {
  //Paste your implementation from assignment unit 3c here
  const playerNewStart = await req.game.startNew(req.body.start, req.body.inventory);
  const getPlayerInfo = await req.game.state;
  res.send(playerNewStart);
});

app.post('/createPlayerFile', async(req, res) => {
    try {
      const fileLocation = gameFilesFolderName + `/${req.body.name}.json`;
      await promiseWrappers.createEmptyFileP(fileLocation);
      await promiseWrappers.writeFileP(fileLocation, JSON.stringify(req.body));
      res.send(req.body)
    } catch(error) {
      error = "Er is iets fout gegaan bij het aanmaken van de speler.";
      res.json(error);
  }
});

app.delete('/deletePlayerFile/:player', async(req, res) => {
    const message = {
      "result" : `Game ${req.params.player}.json removed`
    }
    try {
      await promiseWrappers.unlinkFileP(gameFilesFolderName + `/${req.params.player}.json`);
      res.json(message);
    } catch(error) {
        res.json(error);
    }
})

const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});