const express = require('express')
const actionsApp = express();
const actions = express.Router();

const gameFileReader = async (req, res, next) => {
    //TODO D1, D2
    try {
        req.fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
        req.fileContent = await promiseWrappers.readFileP(req.fileName);
        next();
    } catch (error) {
        if (error) {
            res.status(404);
            res.json(error);
        } else {
            error = new Error('Player does not exist!');
            next(error);
        }
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

actionsApp.use('/:player/', gameFileReader);
actionsApp.use('/:player/', gameStateReader);

actions.get('/:player/where', async (req, res) => {
    const locationInformation = await req.game.getLocationInformation();
    res.json(locationInformation);
});


actions.post('/:player/goto', async (req, res) => {
   //Paste your implementation from assignment unit 3c here
   await req.game.goToLocation(req.query.location);
   const getPlayerInfo = await req.game.state;
   await promiseWrappers.writeFileP(req.fileName, JSON.stringify(getPlayerInfo));
   res.send(getPlayerInfo);
   console.log(getPlayerInfo.map);
});

actions.post('/action/:player/arise', async (req, res) => {
  //Paste your implementation from assignment unit 3c here
  const playerNewStart = await req.game.startNew(req.body.start, req.body.inventory);
  const getPlayerInfo = await req.game.state;
  res.send(playerNewStart);
});