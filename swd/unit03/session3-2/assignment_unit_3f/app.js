'use strict';

const express = require('express');
const Game = require('./game.js');
const promiseWrappers = require('./promise-wrappers');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const games = require('./routes/games');
const actions = require ('./routes/actions');

// const gameFilesFolderName = 'game_files';





app.use(bodyParser.json());
app.use('/games', games);
app.use('actions'. actions);






const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});

